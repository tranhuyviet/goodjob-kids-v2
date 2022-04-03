import useSWR from 'swr';
import { useRouter } from 'next/router';
import React, { ReactChild, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import fetchApi from '../utils/fetchApi';
import Navbar from './Navbar';
import { setJobs } from '../redux/slices/jobSlice';

interface IProps {
	children: ReactChild;
}

const Layout = ({ children }: IProps) => {
	const dispatch = useAppDispatch();

	const { data: jobsData, error: errorJobs } = useSWR('/jobs', fetchApi);

	useEffect(() => {
		if (jobsData && jobsData.status === 'success') {
			dispatch(setJobs(jobsData.data.jobs));
		}
	}, [dispatch, jobsData]);

	if (errorJobs) return <p>Something went wrong.</p>;

	// console.log('LAYOUT - RENDER', jobsData);

	return (
		<div className='relative'>
			<Navbar />
			<div>{children}</div>
		</div>
	);
};

export default Layout;
