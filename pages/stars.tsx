import { useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import { GetServerSideProps, NextPage } from 'next';
import jwt from 'jsonwebtoken';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { removeJobDone, signup } from '../redux/slices/userSlice';
import { IUserWithJobsDone } from '../utils/types';

interface IRemoveJobVariables {
	jobDoneName?: string;
	jobDoneId?: string;
}

const StarsPage: NextPage<{ user: IUserWithJobsDone; token: string }> = ({ user, token }) => {
	const dispatch = useAppDispatch();
	const jobsDone = useAppSelector(state => state.auth.user.jobsDone);
	const { totalStars, isLoggedin } = useAppSelector(state => state.auth);

	if (!isLoggedin) {
		dispatch(signup({ user, token }));
	}

	const [isOpenConfirmDialog, setIsOpenConfirmDialog] = useState(false);
	const initialVariables: IRemoveJobVariables = {
		jobDoneName: undefined,
		jobDoneId: undefined,
	};
	const [variables, setVariables] = useState<IRemoveJobVariables>(initialVariables);

	const handleRemoveJob = ({ jobDoneName, jobDoneId }: IRemoveJobVariables): void => {
		setIsOpenConfirmDialog(true);
		setVariables({ jobDoneName, jobDoneId });
	};

	const confirmYesRemoveJob = async (): Promise<void> => {
		if (variables.jobDoneId) {
			const { data } = await axios.delete(`/users/jobsdone/${variables.jobDoneId}`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			if (data.status === 'success') {
				dispatch(removeJobDone(variables.jobDoneId));
			}
			setIsOpenConfirmDialog(false);
			setVariables(initialVariables);
		}
	};

	const confirmNoRemoveJob = (): void => {
		setIsOpenConfirmDialog(false);
		setVariables(initialVariables);
	};
	return (
		<div className='container min-h-[calc(100vh-68px)] shadow-md pt-6'>
			{jobsDone && jobsDone.length > 0 && (
				<>
					<div className='shadow-md'>
						<div className='grid grid-cols-12 border bg-yellow-400 py-3 rounded-t-xl'>
							<p className='text-center col-span-4 '>Time</p>
							<p className='text-center col-span-5 '>Jobs Done</p>
							<p className='col-span-2 -ml-[8px]'>Got Stars</p>
						</div>
						{jobsDone.map(jobDone => (
							<div
								className='grid grid-cols-12 border-l border-r border-b items-center py-2'
								key={jobDone._id}
							>
								<p className='text-center col-span-4'>
									{moment(Number(jobDone.time)).format('h:mm DD.MM.YYYY')}
								</p>
								<div className='col-span-5 flex items-center'>
									<Image src={jobDone.jobId.image} width={32} height={32} alt='mop' />
									<p className='ml-2 capitalize'>{jobDone.jobId.name}</p>
								</div>
								<div className='col-span-2 relative animate-pulse justify-start'>
									<Image
										src='/images/star.png'
										className='rotate-12'
										width={36}
										height={36}
										alt='mop'
									/>
									<p className='absolute top-2 left-4'>{jobDone.jobId.star}</p>
								</div>
								<button
									type='button'
									className='col-span-1 -ml-2 hover:cursor-pointer'
									onClick={() =>
										handleRemoveJob({ jobDoneName: jobDone.jobId.name, jobDoneId: jobDone._id })
									}
								>
									<Image src='/images/cancel.png' className='' width={20} height={20} alt='mop' />
								</button>
							</div>
						))}
					</div>
					<div className='w-full mt-6 flex justify-center'>
						<button
							type='button'
							className='hover:text-green-400 hover:border-green-400 hover:shadow-xl transition-all duration-300 border-green-600 border text-green-600 py-2 px-5 rounded-lg shadow-md tracking-wider flex items-center'
						>
							<Image
								src='/images/pickup.png'
								className='rotate-12'
								width={36}
								height={36}
								alt='mop'
							/>
							<span className='block ml-2 text-lg '>{`Pickup ${totalStars} Stars`}</span>
						</button>
					</div>
				</>
			)}
			{jobsDone && jobsDone.length === 0 && (
				<p className='text-center text-xl mt-4'>You have not finished any job yet</p>
			)}
			{isOpenConfirmDialog && (
				<button
					type='button'
					className='absolute inset-0 container max-h-screen flex items-center justify-center backdrop-brightness-[.4]'
					onClick={confirmNoRemoveJob}
				>
					<div className='w-3/4 h-[160px] bg-green-200 text-center rounded-3xl shadow-2xl'>
						<p className='text-lg mt-4'>Are you sure to remove</p>
						<p className='text-2xl font-bold tracking-wider mt-2 capitalize'>
							{variables?.jobDoneName} ???
						</p>
						<div className='flex mt-4 justify-end pr-4'>
							<button
								className='py-1 px-7 rounded-xl border shadow-md bg-green-600 text-gray-50 text-lg tracking-wider'
								type='button'
								onClick={confirmYesRemoveJob}
							>
								Yes
							</button>
							<button
								className='ml-4 py-1 px-7 rounded-xl border shadow-md bg-red-600 text-gray-50 text-lg tracking-wider'
								type='button'
								onClick={confirmNoRemoveJob}
							>
								No
							</button>
						</div>
					</div>
				</button>
			)}
		</div>
	);
};

export default StarsPage;

export const getServerSideProps: GetServerSideProps = async context => {
	const token = context.req.cookies.goodjobkids;
	try {
		const user = jwt.verify(token, process.env.JWT_SECRET as string);
		return { props: { user, token } };
	} catch (error) {
		return { redirect: { destination: '/signup', permanent: false } };
	}
};
