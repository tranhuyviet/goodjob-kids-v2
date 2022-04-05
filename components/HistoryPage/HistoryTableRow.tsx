import moment from 'moment';
import React from 'react';
import Image from 'next/image';
import { IHistory } from '../../utils/types';

const HistoryTableRow: React.FC<{ history: IHistory }> = ({ history }) => {
	return (
		<div className='grid grid-cols-12 border-l border-r border-b items-center py-2'>
			<p className='text-center col-span-3'>
				{moment(Number(history.timeGotStars)).format('DD.MM.YYYY')}
			</p>
			<div className='col-span-2 flex justify-center items-center -ml-2'>
				<div className='relative animate-pulse'>
					<Image src='/images/star.png' className='rotate-12' width={36} height={36} alt='mop' />
					<p className='absolute top-2 left-4'>{history.totalStars}</p>
				</div>
			</div>
			<div className='col-span-6 flex items-center'>
				<input
					autoComplete='off'
					type='text'
					className=' placeholder:text-gray-400 block w-full rounded-lg shadow-md focus:border-0 focus:ring-green-600 focus:ring-2 h-[38px] tracking-wider text-center'
					name='comment'
					placeholder='ex: Buy the toys'
					value={history.comment}
					//	onChange={handleChange}
				/>
			</div>
			<div className='flex justify-center items-center'>
				<Image
					src='/images/arrow.png'
					width={22}
					height={22}
					alt='mop'
					className=' rounded-full hover:cursor-pointer'
				/>
			</div>
		</div>
	);
};

export default HistoryTableRow;
