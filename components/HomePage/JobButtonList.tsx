import { useState, useEffect } from 'react';
import Image from 'next/image';
import useSWR from 'swr';
import { useAppSelector } from '../../redux/hooks';
import JobButton from './JobButton';
import fetchApi from '../../utils/fetchApi';
import { IJob } from '../../utils/types';

const JobButtonList = () => {
	const [isOpenDialog, setIsOpenDialog] = useState(false);
	const token = useAppSelector(state => state.auth.token);
	// const jobs = useAppSelector(state => state.job.jobs);
	const name = useAppSelector(state => state.auth.user.name);
	const { data, error } = useSWR(token ? ['/jobs', token] : null, fetchApi);

	useEffect(() => {
		if (isOpenDialog) {
			setTimeout(() => {
				setIsOpenDialog(false);
			}, 2000);
		}
	}, [isOpenDialog]);

	if (error) return <p>Fail to load jobs</p>;
	if (!data) return <p>Loading jobs</p>;

	const jobs = data.data.jobs as IJob[];

	console.log('JOB BUTTON LIST - RENDER');

	return (
		<div className='h-full pt-6'>
			<div className='grid grid-cols-2 gap-4 place-items-center'>
				{jobs &&
					jobs.map(job => <JobButton key={job._id} job={job} setIsOpenDialog={setIsOpenDialog} />)}
			</div>
			{isOpenDialog && (
				<div className='absolute container max-h-screen backdrop-brightness-[.4] inset-0 flex justify-center items-center'>
					<div className='text-center'>
						<h2 className='text-4xl text-center text-yellow-400 px-4 py-4 uppercase animate-ping'>
							Good Job
						</h2>
						<h2 className='text-4xl text-center px-4 py-4 uppercase animate-bounce tracking-widest text-red-400'>
							{name}
						</h2>
						<Image
							src='/images/like.png'
							className=' animate-pulse mt-6 block'
							width={160}
							height={160}
							alt='mop'
						/>
					</div>
				</div>
			)}
		</div>
	);
};

export default JobButtonList;
