import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import Job from '../../../../models/jobModel';
import checkAuth from '../../../../utils/checkAuth';
import db from '../../../../utils/db';
import errorParse from '../../../../utils/errorParse';
import { resError, resSuccess } from '../../../../utils/returnRes';

const handler = nc();

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		// connect db
		await db.connect();

		// check authentication
		const user = await checkAuth(req);

		if (!user) {
			return resError(
				res,
				'Unauthorized',
				{
					global: 'You are not logged in',
				},
				401,
			);
		}

		// populate jobs done
		await user.populate({
			path: 'jobsDone',
			populate: {
				path: 'jobId',
				model: Job,
				select: 'name image star',
			},
		});

		// disconnect db
		await db.disconnect();

		// return job done id have just added to jobsdone array
		return resSuccess(res, { jobsDone: user.jobsDone });
	} catch (error) {
		if (error instanceof Error && error.name === 'ValidationError') {
			const errors = errorParse(error);
			return resError(res, 'Bad Request Error - Validate Input', errors, 400);
		}
		return resError(res, 'Something went wrong', { global: 'Something went wrong' }, 500);
	}
});

export default handler;
