import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import userService from '../../../services/userService';
import checkAuth from '../../../utils/checkAuth';
import db from '../../../utils/db';
import errorParse from '../../../utils/errorParse';
import { generateCookie } from '../../../utils/generate';
import { resError, resSuccess } from '../../../utils/returnRes';
import { signupValidate } from '../../../utils/validate';

const handler = nc();

// update user: change name
handler.put(async (req: NextApiRequest, res: NextApiResponse) => {
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

		const { name } = req.body;

		await signupValidate.validate({ name }, { abortEarly: false });

		const updatedUser = await userService.updateName(user._id, name.trim());

		const token: string = updatedUser!.returnToken();

		// disconnect db
		await db.disconnect();

		// set the cookie to client
		res.setHeader('Set-Cookie', generateCookie(token, 12));

		// return job done id have just added to jobsdone array
		return resSuccess(res, { user: updatedUser, token });
	} catch (error) {
		if (error instanceof Error && error.name === 'ValidationError') {
			const errors = errorParse(error);
			return resError(res, 'Bad Request Error - Validate Input', errors, 400);
		}
		return resError(res, 'Something went wrong', { global: 'Something went wrong' }, 500);
	}
});

export default handler;
