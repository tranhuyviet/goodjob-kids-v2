import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const baseUrl = process.env.NEXTAUTH_URL as string;
const secret = process.env.JWT_SECRET as string;

const middleware = (req: NextRequest) => {
	const { cookies, url, nextUrl } = req;
	const token = cookies.goodjobkids;

	// console.log('MIDDLEWARE', { token, url });

	if (url === `${baseUrl}/api/auth`) {
		return NextResponse.next();
	}

	if (url === `${baseUrl}/`) {
		if (token === undefined || token === null) {
			nextUrl.pathname = '/signup';
			return NextResponse.rewrite(new URL('/signup', req.url));
		}
		try {
			jwt.verify(token, secret);
			return NextResponse.next();
		} catch (error) {
			return NextResponse.rewrite(new URL('/signup', req.url));
		}
	}

	if (url === `${baseUrl}/signup`) {
		if (token === undefined || token === null) {
			return NextResponse.next();
		}

		try {
			jwt.verify(token, secret);
			return NextResponse.rewrite(new URL('/', req.url));
		} catch (error) {
			return NextResponse.next();
		}
	}

	return NextResponse.next();

	// if (token === undefined || token === null) {
	// 	return NextResponse.rewrite(new URL('/signup', req.url));
	// }

	// // if token have value -> check valid value
	// try {
	// 	jwt.verify(token, secret);

	// 	// if token is valid -> redirect home page
	// 	return NextResponse.rewrite(new URL('/', req.url));
	// } catch (e) {
	// 	// if token is invalid -> redirect signup page
	// 	return NextResponse.rewrite(new URL('/signup', req.url));
	// }
};

export default middleware;
