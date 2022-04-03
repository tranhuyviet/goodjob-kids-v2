import { useRouter } from 'next/router';
import React, { ReactChild, useEffect } from 'react';
import { useAppSelector } from '../redux/hooks';

import Navbar from './Navbar';

interface IProps {
	children: ReactChild;
}

const Layout = ({ children }: IProps) => {
	const router = useRouter();
	const auth = useAppSelector(state => state.auth);

	useEffect(() => {
		if (!auth.isLoggedin) {
			router.push('/signup');
		}
	});

	console.log('LAYOUT - RENDER');

	return (
		<div className='relative'>
			<Navbar />
			<div>{children}</div>
		</div>
	);
};

export default Layout;
