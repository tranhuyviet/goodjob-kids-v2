import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import User from '../../../models/userModel';
import userService from '../../../services/userService';
import db from '../../../utils/db';
import errorParse from '../../../utils/errorParse';
import { generateUserName, generateCookie } from '../../../utils/generate';
import { resError, resSuccess } from '../../../utils/returnRes';
import { IUserDocument } from '../../../utils/types';
import signupValidate from '../../../utils/validate';

const handler = nc();

// signup and login
handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const { name } = req.body;

		// validate name
		await signupValidate.validate({ name }, { abortEarly: false });

		// connect db
		await db.connect();

		// create userName
		let userName: string = '';
		let isUserExist = false;
		do {
			userName = generateUserName(name.trim());
			// eslint-disable-next-line no-await-in-loop
			isUserExist = !!(await userService.findUserByUserName(userName));
		} while (isUserExist);

		// create new user
		const newUser: IUserDocument = new User({
			name: name.trim(),
			userName,
		});

		const user = await userService.create(newUser);

		const token: string = user.returnToken();

		// eslint-disable-next-line no-param-reassign
		req.cookies = {
			token,
		};
		// disconnect db
		await db.disconnect();

		// set the cookie to client
		res.setHeader('Set-Cookie', generateCookie(token, 12));

		return resSuccess(res, user);
	} catch (error) {
		if (error instanceof Error && error.name === 'ValidationError') {
			const errors = errorParse(error);
			return resError(res, 'Bad Request Error - Validate Input', errors, 400);
		}
		return resError(res, 'Something went wrong', { global: 'Something went wrong' }, 500);
	}
});

export default handler;
