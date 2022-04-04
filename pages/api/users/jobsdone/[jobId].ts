import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import jobService from '../../../../services/jobService';
import userService from '../../../../services/userService';
import checkAuth from '../../../../utils/checkAuth';
import db from '../../../../utils/db';
import errorParse from '../../../../utils/errorParse';
import { generateCookie } from '../../../../utils/generate';
import { resError, resSuccess } from '../../../../utils/returnRes';
import { IJobDoneBody } from '../../../../utils/types';

const handler = nc();

handler.put(async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		// connect db
		await db.connect();

		const user = await checkAuth(req);

		if (!user) {
			// remove cookie
			res.setHeader('Set-Cookie', generateCookie('', -1));
			return resError(
				res,
				'Unauthorized',
				{
					global: 'You are not logged in',
				},
				401,
			);
		}

		const { jobId } = req.query;
		const { time } = req.body;

		// find the job by jobId
		const job = await jobService.findJobById(jobId as string);

		if (!job) {
			return resError(
				res,
				'Not Found',
				{
					global: 'Job Not Found',
				},
				404,
			);
		}

		const jobDone: IJobDoneBody = {
			jobId: Object(jobId),
			time,
		};

		// add jobdone to array jobsdone and save
		user.jobsDone.push(jobDone);

		const updatedUser = await userService.update(user);

		// disconnect db
		await db.disconnect();

		// return job done id have just added to jobsdone array
		return resSuccess(res, {
			jobDoneId: updatedUser?.jobsDone[updatedUser.jobsDone.length - 1]._id,
		});
	} catch (error) {
		if (error instanceof Error && error.name === 'ValidationError') {
			const errors = errorParse(error);
			return resError(res, 'Bad Request Error - Validate Input', errors, 400);
		}
		return resError(res, 'Something went wrong', { global: 'Something went wrong' }, 500);
	}
});

export default handler;
