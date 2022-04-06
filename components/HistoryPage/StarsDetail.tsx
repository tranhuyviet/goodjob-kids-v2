import moment from 'moment';
import React from 'react';
import Image from 'next/image';
import { IJobDonePopulated } from '../../utils/types';

const StarsDetail: React.FC<{ jobsDone: IJobDonePopulated[] }> = ({ jobsDone }) => {
	return (
		<div className='w-full bg-button '>
			{jobsDone &&
				jobsDone.map(jobDone => (
					<div className='grid grid-cols-12 border-l border-r border-b items-center py-2 border-gray-50'>
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
					</div>
				))}
		</div>
	);
};

export default StarsDetail;
