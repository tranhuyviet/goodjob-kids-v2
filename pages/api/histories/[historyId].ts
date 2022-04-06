import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import db from '../../../utils/db';
import errorParse from '../../../utils/errorParse';
import { generateCookie } from '../../../utils/generate';
import { resError, resSuccess } from '../../../utils/returnRes';
import { historyValidate } from '../../../utils/validate';
import historyService from '../../../services/historyService';
import checkAuth from '../../../utils/checkAuth';

const handler = nc();
// update history comment
handler.put(async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
	try {
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

		const { historyId } = req.query;
		const { comment } = req.body;

		// validate comment
		await historyValidate.validate({ comment }, { abortEarly: false });

		// check is historyId correct
		const history = await historyService.getHistoryById(historyId as string);

		if (!history) {
			return resError(
				res,
				'Not Found',
				{
					global: 'Not Found History',
				},
				400,
			);
		}

		// check history belong the user is correct
		if (history.userId.toString() !== user._id.toString()) {
			return resError(
				res,
				'Not Allowed',
				{
					global: 'You are not allowed to edit this comment',
				},
				405,
			);
		}

		// save history to database
		const updatedHistory = await historyService.updateComment(historyId as string, comment.trim());

		// disconnect db
		await db.disconnect();

		return resSuccess(res, { updatedHistory });
	} catch (error) {
		if (error instanceof Error && error.name === 'ValidationError') {
			const errors = errorParse(error);
			return resError(res, 'Bad Request Error - Validate Input', errors, 400);
		}
		return resError(res, 'Something went wrong', { global: 'Something went wrong' }, 500);
	}
});

export default handler;
