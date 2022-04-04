import { NextApiRequest } from 'next';
import jwt from 'jsonwebtoken';
import { IUser, IUserDocument } from './types';
import userService from '../services/userService';

const secret = process.env.JWT_SECRET as string;

const checkAuth = async (req: NextApiRequest): Promise<IUserDocument | null> => {
	// get token from headers
	let token: string;
	if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
		token = req.headers.authorization.split(' ')[1] as string;
	} else {
		token = '';
	}

	// checking valid token
	try {
		const user = jwt.verify(token, secret) as IUser;

		// checking user
		const authUser = await userService.findUserByUserId(user._id);
		if (!authUser) {
			return null;
		}
		// return authenticated user
		return authUser;
	} catch (error) {
		return null;
	}
};

export default checkAuth;
