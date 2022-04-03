import { NextApiResponse } from 'next';

export const resError = (
	res: NextApiResponse,
	message: string,
	errors: object | null,
	code: number,
) => {
	return res.status(code).json({
		status: 'error',
		message,
		errors,
	});
};

export const resSuccess = (res: NextApiResponse, data: any = null, code: number = 200) => {
	return res.status(code).json({
		status: 'success',
		data,
	});
};
