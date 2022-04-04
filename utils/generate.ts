import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';
import { NextApiRequest } from 'next';
import { IJobDonePopulated, IUser } from './types';

const secret = process.env.JWT_SECRET as string;

export const generateRandomNumber = (minRange: number, maxRange: number): number => {
	const min = Math.ceil(minRange);
	const max = Math.ceil(maxRange);
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const generateUserName = (name: string): string => {
	return `${name}#${generateRandomNumber(1000, 9999)}`;
};

export const generateToken = ({ _id, name, userName, totalStars }: IUser): string => {
	return jwt.sign({ _id, name, userName, totalStars }, secret);
};

export const generateCookie = (token: string, maxAgeMonth: number): string => {
	return serialize('goodjobkids', token, {
		httpOnly: true,
		secure: true,
		sameSite: 'strict',
		path: '/',
		maxAge: 60 * 60 * 24 * maxAgeMonth,
	});
};

export const generateAuthenticatedUserId = (req: NextApiRequest): string | null => {
	// get token from headers
	let token: string;
	if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
		token = req.headers.authorization.split(' ')[1] as string;
	} else {
		return null;
	}

	// check token is valid
	try {
		const user = jwt.verify(token, secret) as IUser;

		// if token is valid, return authenticated user id
		return user._id;
	} catch (error) {
		return null;
	}
};

export const calculateStars = (jobsDone: IJobDonePopulated[]): number => {
	let totalStars = 0;
	// eslint-disable-next-line no-restricted-syntax
	for (const jobDone of jobsDone) {
		totalStars += jobDone.jobId.star;
	}
	return totalStars;
};
