import useSWR from 'swr';
import React, { ReactChild, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import fetchApi from '../utils/fetchApi';
import Navbar from './Navbar';
import { setJobs } from '../redux/slices/jobSlice';
import { setJobsDone } from '../redux/slices/userSlice';

interface IProps {
	children: ReactChild;
}

const Layout = ({ children }: IProps) => {
	const dispatch = useAppDispatch();
	const token = useAppSelector(state => state.auth.token);

	const { data: jobsData, error: errorJobs } = useSWR(token ? ['/jobs', token] : null, fetchApi);
	const { data: jobsDone, error: errorJobsDone } = useSWR(
		token ? ['/users/jobsdone', token] : null,
		fetchApi,
	);

	useEffect(() => {
		if (jobsData && jobsData.status === 'success') {
			dispatch(setJobs(jobsData.data.jobs));
		}
		if (jobsDone && jobsDone.status === 'success') {
			dispatch(setJobsDone(jobsDone.data.jobsDone));
		}
	}, [dispatch, jobsData, jobsDone]);

	if (errorJobs || errorJobsDone) return <p>Something went wrong.</p>;

	// console.log('LAYOUT - RENDER', jobsData);

	return (
		<div className='relative'>
			<Navbar />
			<div>{children}</div>
		</div>
	);
};

export default Layout;
