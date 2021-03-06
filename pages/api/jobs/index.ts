import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import jobService from '../../../services/jobService';
import checkAuth from '../../../utils/checkAuth';
import db from '../../../utils/db';
import errorParse from '../../../utils/errorParse';
import { generateCookie } from '../../../utils/generate';

import { resError, resSuccess } from '../../../utils/returnRes';

const handler = nc();

// get all jobs
handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
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

		// get all jobs from database
		const jobs = await jobService.getJobs();

		// if job not found
		if (!jobs) {
			resError(res, 'Not Found', { global: 'Job not found' }, 404);
		}

		// disconnect db
		await db.disconnect();

		// return jobs
		return resSuccess(res, { jobs });
	} catch (error) {
		if (error instanceof Error && error.name === 'ValidationError') {
			const errors = errorParse(error);
			return resError(res, 'Bad Request Error - Validate Input', errors, 400);
		}
		return resError(res, 'Something went wrong', { global: 'Something went wrong' }, 500);
	}
});

export default handler;
