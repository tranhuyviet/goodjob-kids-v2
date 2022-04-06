import React from 'react';
import moment from 'moment';
import Image from 'next/image';
import { IJobDonePopulated, IRemoveJobVariables } from '../../utils/types';

const GridRow: React.FC<{
	jobDone: IJobDonePopulated;
	handleRemoveJob: (arg: IRemoveJobVariables) => void;
}> = ({ jobDone, handleRemoveJob }) => {
	return (
		<div className='grid grid-cols-12 border-l border-r border-b items-center py-2 '>
			<p className='text-center col-span-4'>
				{moment(Number(jobDone.time)).format('h:mm DD.MM.YYYY')}
			</p>
			<div className='col-span-5 flex items-center'>
				<Image src={jobDone.jobId.image} width={32} height={32} alt='mop' />
				<p className='ml-2 capitalize'>{jobDone.jobId.name}</p>
			</div>
			<div className='col-span-2 relative animate-pulse justify-start'>
				<Image src='/images/star.png' className='rotate-12' width={36} height={36} alt='mop' />
				<p className='absolute top-2 left-4'>{jobDone.jobId.star}</p>
			</div>
			<button
				type='button'
				className='col-span-1 -ml-2 hover:cursor-pointer'
				onClick={() => handleRemoveJob({ jobDoneName: jobDone.jobId.name, jobDoneId: jobDone._id })}
			>
				<Image src='/images/close.png' className='' width={38} height={38} alt='mop' />
			</button>
		</div>
	);
};

export default GridRow;
