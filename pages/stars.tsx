import { useEffect, useState } from 'react';
import axios from 'axios';
import { GetServerSideProps, NextPage } from 'next';
import useSWR from 'swr';
import jwt from 'jsonwebtoken';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { removeJobDone, setJobsDone, signup } from '../redux/slices/userSlice';
import { IJobDonePopulated, IRemoveJobVariables, IUserWithJobsDone } from '../utils/types';
import GridHeader from '../components/StarPage/GridHeader';
import GridRow from '../components/StarPage/GridRow';
import ConfirmDeleteDialog from '../components/StarPage/ConfirmDeleteDialog';
import PickupStarsButton from '../components/StarPage/PickupStarsButton';
import fetchApi from '../utils/fetchApi';

const StarsPage: NextPage<{ user: IUserWithJobsDone; token: string }> = ({ user, token }) => {
	const dispatch = useAppDispatch();

	const { totalStars, isLoggedin } = useAppSelector(state => state.auth);

	if (!isLoggedin) {
		dispatch(signup({ user, token }));
	}

	const { data, error } = useSWR(token ? ['/users/jobsdone', token] : null, fetchApi);

	const [isOpenConfirmDeleteDialog, setIsOpenConfirmDeleteDialog] = useState(false);

	const initialVariables: IRemoveJobVariables = {
		jobDoneName: undefined,
		jobDoneId: undefined,
	};

	const [variables, setVariables] = useState<IRemoveJobVariables>(initialVariables);

	const handleRemoveJob = ({ jobDoneName, jobDoneId }: IRemoveJobVariables): void => {
		setIsOpenConfirmDeleteDialog(true);
		setVariables({ jobDoneName, jobDoneId });
	};

	const confirmYesRemoveJob = async (): Promise<void> => {
		if (variables.jobDoneId) {
			const { data: dataDelete } = await axios.delete(`/users/jobsdone/${variables.jobDoneId}`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			if (dataDelete.status === 'success') {
				dispatch(removeJobDone(variables.jobDoneId));
			}
			setIsOpenConfirmDeleteDialog(false);
			setVariables(initialVariables);
		}
	};

	const confirmNoRemoveJob = (): void => {
		setIsOpenConfirmDeleteDialog(false);
		setVariables(initialVariables);
	};

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	if (error) return <p>Fail to load jobs</p>;
	if (!data) return <p>Loading jobs</p>;

	const jobsDone = data.data.jobsDone as IJobDonePopulated[];

	dispatch(setJobsDone(jobsDone));

	console.log('STARS PAGE - RENDER');

	return (
		<div className='container min-h-[calc(100vh-68px)] shadow-md pt-6'>
			{jobsDone && jobsDone.length > 0 && (
				<>
					<div className='shadow-md'>
						<GridHeader />
						{jobsDone.map(jobDone => (
							<GridRow key={jobDone._id} jobDone={jobDone} handleRemoveJob={handleRemoveJob} />
						))}
					</div>
					<div className='w-full mt-8 flex justify-center'>
						{/* <GotStarsButton totalStars={totalStars} /> */}
						<PickupStarsButton totalStars={totalStars} />
					</div>
				</>
			)}
			{jobsDone && jobsDone.length === 0 && (
				<div className='flex flex-col items-center'>
					<p className='text-center text-2xl mt-2'>You have no any stars.</p>
					<Link href='/'>
						<a
							className='mt-4 text-base hover:text-green-400 hover:border-green-400 hover:shadow-xl transition-all duration-300 border-green-600 border text-green-600 py-3 px-5 rounded-lg shadow-md tracking-wider flex items-center'
							href='href'
						>
							Back to Home Page to add star
						</a>
					</Link>
				</div>
			)}
			{isOpenConfirmDeleteDialog && (
				<ConfirmDeleteDialog
					confirmNoRemoveJob={confirmNoRemoveJob}
					confirmYesRemoveJob={confirmYesRemoveJob}
					variables={variables}
				/>
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
