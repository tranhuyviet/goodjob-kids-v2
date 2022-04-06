import React, { useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import Image from 'next/image';
import classNames from 'classnames';
import { useFormik } from 'formik';
import ReactLoading from 'react-loading';
import { IHistoryBody, IHistoryPopulated } from '../../utils/types';
import StarsDetail from './StarsDetail';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { updateComment } from '../../redux/slices/historySlice';

const HistoryTableRow: React.FC<{ history: IHistoryPopulated }> = ({ history }) => {
	const token = useAppSelector(state => state.auth.token);
	const dispatch = useAppDispatch();

	const [toggleDetail, setToggleDetail] = useState(false);
	const [isCommentTextChange, setIsCommentTextChange] = useState(false);
	const [loading, setLoading] = useState(false);

	const initialValues: IHistoryBody = {
		comment: history.comment,
	};

	const handleToggleDetail = () => {
		setToggleDetail(prev => !prev);
	};

	const onSubmit = async (values: IHistoryBody): Promise<void> => {
		try {
			setLoading(true);
			const { data } = await axios.put(`/histories/${history._id}`, values, {
				headers: { Authorization: `Bearer ${token}` },
			});
			if (data.status === 'success') {
				dispatch(updateComment({ historyId: history._id, comment: values.comment }));
				setLoading(false);
				setIsCommentTextChange(false);
			}
			return;
		} catch (error: any) {
			setErrors(error?.response?.data?.errors);
			setLoading(false);
		}
	};

	const { values, handleChange, handleSubmit, errors, setErrors } = useFormik<IHistoryBody>({
		initialValues,
		onSubmit,
	});

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
				<div className='col-span-6  '>
					<form className='flex items-center w-full' onSubmit={handleSubmit}>
						<textarea
							autoComplete='off'
							rows={2}
							className=' placeholder:text-gray-400 block w-full rounded-lg shadow-xs focus:border-0 focus:ring-green-600 focus:ring-2  tracking-wider m-0 px-2 py-1'
							name='comment'
							placeholder='ex: Buy the toys'
							value={values.comment}
							onChange={e => {
								handleChange(e);
								setIsCommentTextChange(true);
							}}
						/>
						{errors && errors.comment && <p className='text-red-500 mt-2'>{errors.comment}</p>}
						<button
							type='submit'
							className={classNames('ml-3 mt-[6px]', isCommentTextChange ? '' : 'hidden')}
						>
							{loading ? (
								<ReactLoading type='spinningBubbles' height={20} width={20} color='#6FC2CB' />
							) : (
								<Image src='/images/save.png' width={22} height={22} alt='mop' />
							)}
						</button>
					</form>
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
						className={classNames('transition duration-300', toggleDetail ? 'rotate-180' : '')}
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
