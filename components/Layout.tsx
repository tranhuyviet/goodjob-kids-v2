import React, { ReactChild } from 'react';

import Navbar from './Navbar';

interface IProps {
	children: ReactChild;
}

const Layout = ({ children }: IProps) => {
	console.log('LAYOUT - RENDER');

	return (
		<div className='relative'>
			<Navbar />
			<div>{children}</div>
		</div>
	);
};

export default Layout;
