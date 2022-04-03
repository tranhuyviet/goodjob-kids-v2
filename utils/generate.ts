import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import { IUser } from './types';

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

export const generateCookie = (token: string): string => {
	return cookie.serialize('goodjobkids', token, {
		httpOnly: true,
		secure: true,
		sameSite: 'strict',
		path: '/',
	});
};
