import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import userService from '../../../../services/userService';
import checkAuth from '../../../../utils/checkAuth';
import db from '../../../../utils/db';
import errorParse from '../../../../utils/errorParse';
import { generateCookie } from '../../../../utils/generate';
import { resError, resSuccess } from '../../../../utils/returnRes';
import { userNameValidate } from '../../../../utils/validate';

const handler = nc();

// get token and set cookie
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

		const { userName } = req.query;

		await userNameValidate.validate({ userName }, { abortEarly: false });

		// check userName is correct
		const userWantToLoggedIn = await userService.findUserByUserName(userName as string);

		if (!userWantToLoggedIn) {
			return resError(
				res,
				'Not Found',
				{
					global: 'Invalid code, please enter the code again.',
				},
				404,
			);
		}
		const token: string = userWantToLoggedIn.returnToken();

		// disconnect db
		await db.disconnect();

		// set the cookie to client
		res.setHeader('Set-Cookie', generateCookie(token, 12));

		return resSuccess(res, { user: userWantToLoggedIn, token });
	} catch (error) {
		if (error instanceof Error && error.name === 'ValidationError') {
			const errors = errorParse(error);
			return resError(res, 'Bad Request Error - Validate Input', errors, 400);
		}
		return resError(res, 'Something went wrong', { global: 'Something went wrong' }, 500);
	}
});

export default handler;
