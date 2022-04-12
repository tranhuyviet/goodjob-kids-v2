import useSWR from 'swr';
import React, { ReactChild, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import fetchApi from '../utils/fetchApi';
import Navbar from './Navbar';
import { setHistories } from '../redux/slices/historySlice';

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
