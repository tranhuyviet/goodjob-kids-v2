import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import Job from '../../../models/jobModel';
import History from '../../../models/historyModel';
import userService from '../../../services/userService';
import db from '../../../utils/db';
import errorParse from '../../../utils/errorParse';
import { calculateStars, generateCookie } from '../../../utils/generate';
import { resError, resSuccess } from '../../../utils/returnRes';
import { IHistoryDocument } from '../../../utils/types';
import { historyValidate } from '../../../utils/validate';
import historyService from '../../../services/historyService';
import checkAuth from '../../../utils/checkAuth';

const handler = nc();

// POST /api/histories
// add to history: got stars
handler.post(async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
	try {
		const { comment } = req.body;

		// validate comment
		await historyValidate.validate({ comment }, { abortEarly: false });

		// connect db
		await db.connect();

		// check authentication
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

		// history: userId, jobsDone, totalStars, timeGotStars, comment
		const userId = user._id;
		const jobsDone = [...user.jobsDone];

		if (jobsDone.length === 0) {
			return resError(
				res,
				'Method Not Allow',
				{
					global: 'Got at least one star',
				},
				405,
			);
		}

		await user.populate({
			path: 'jobsDone',
			populate: {
				path: 'jobId',
				model: Job,
				select: 'name image star',
			},
		});
		const totalStars = calculateStars(user.jobsDone as any);
		const timeGotStars = Date.now().toString();

		const newHistory: IHistoryDocument = new History({
			userId,
			jobsDone,
			totalStars,
			timeGotStars,
			comment,
		});

		// save history to database
		const history = await historyService.create(newHistory);

		// empty array jobsDone in user collection
		user.jobsDone = [];

		// save user with empty jobsDone to database
		await userService.update(user);

		// disconnect db
		await db.disconnect();

		return resSuccess(res, { history });
	} catch (error) {
		if (error instanceof Error && error.name === 'ValidationError') {
			const errors = errorParse(error);
			return resError(res, 'Bad Request Error - Validate Input', errors, 400);
		}
		return resError(res, 'Something went wrong', { global: 'Something went wrong' }, 500);
	}
});

// get history

export default handler;
