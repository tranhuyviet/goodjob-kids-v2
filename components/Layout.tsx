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
	const dispatch = useAppDispatch();
	const token = useAppSelector(state => state.auth.token);

	const { data: historiesData, error: errorHistories } = useSWR(
		token ? ['/histories', token] : null,
		fetchApi,
	);

	useEffect(() => {
		if (historiesData && historiesData.status === 'success') {
			dispatch(setHistories(historiesData.data.histories));
		}
	}, [dispatch, historiesData]);

	if (errorHistories) return <p>Something went wrong.</p>;

	console.log('LAYOUT - RENDER');

	return (
		<div className='relative'>
			<Navbar />
			<div>{children}</div>
		</div>
	);
};

export default Layout;
