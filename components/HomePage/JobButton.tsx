import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { IJob, IJobDonePopulated } from '../../utils/types';
import { addJobDone } from '../../redux/slices/userSlice';

interface IJobButton {
	job: IJob;
	setIsOpenDialog: Dispatch<SetStateAction<boolean>>;
}

const JobButton = ({ job, setIsOpenDialog }: IJobButton) => {
	const dispatch = useAppDispatch();
	const token = useAppSelector(state => state.auth.token);

	const handleJobClick = async () => {
		try {
			const { data } = await axios.post(
				`/users/jobsdone/${job._id}`,
				{},
				{
					headers: { Authorization: `Bearer ${token}` },
				},
			);

			if (data && data.status === 'success') {
				const newJobDone: IJobDonePopulated = {
					_id: data.data.jobDoneId,
					jobId: {
						name: job.name,
						image: job.image,
						star: job.star,
					},
					time: data.data.time,
				};

				dispatch(addJobDone(newJobDone));
				setIsOpenDialog(true);
			}

			return;
		} catch (error) {
			// eslint-disable-next-line no-console
			console.log(error);
		}
	};

	// console.log('JOBBUTTON - RENDER');

	return (
		<button
			className='shadow-lg w-full min-h-[160px] flex items-center justify-center relative rounded-2xl bg-green-100 hover:cursor-pointer'
			onClick={handleJobClick}
			type='button'
		>
			<div className='flex flex-col items-center justify-center p-4'>
				<Image src={job.image} className='job-icons' width={70} height={70} alt='mop' />
				<p className='mt-2 text-lg capitalize'>{job.name}</p>
			</div>
			<div className='absolute right-2 top-2'>
				<div className='relative animate-pulse'>
					<Image src='/images/star.png' className='rotate-12' width={36} height={36} alt='mop' />
					<p className='absolute right-[14px] top-2'>{job.star}</p>
				</div>
			</div>
		</button>
	);
};

export default JobButton;
