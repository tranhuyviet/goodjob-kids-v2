import React, { useState } from 'react';
import moment from 'moment';
import Image from 'next/image';
import classNames from 'classnames';
import { IHistoryPopulated } from '../../utils/types';
import StarsDetail from './StarsDetail';

const HistoryTableRow: React.FC<{ history: IHistoryPopulated }> = ({ history }) => {
	const [toggleDetail, setToggleDetail] = useState(false);

	const handleToggleDetail = () => {
		setToggleDetail(prev => !prev);
	};

	return (
		<div>
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
						className=' placeholder:text-gray-400 block w-full rounded-lg shadow-xs focus:border-0 focus:ring-green-600 focus:ring-2 h-[38px] tracking-wider text-center'
						name='comment'
						placeholder='ex: Buy the toys'
						value={history.comment}
						//	onChange={handleChange}
					/>
				</div>
				<button
					type='button'
					className='flex justify-center items-center'
					onClick={handleToggleDetail}
				>
					<Image
						src='/images/arrow.png'
						width={22}
						height={22}
						alt='mop'
						className={classNames('transition duration-300', toggleDetail ? '' : 'rotate-180')}
					/>
				</button>
			</div>
			<div className={classNames(toggleDetail ? '' : 'hidden')}>
				<StarsDetail jobsDone={history.jobsDone} />
			</div>
		</div>
	);
};

export default HistoryTableRow;
