import React, { useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { IHistoryBody } from '../../utils/types';
import { setJobsDone } from '../../redux/slices/userSlice';
import { addHistory } from '../../redux/slices/historySlice';

const GotStarsButton: React.FC<{ totalStars: number }> = ({ totalStars }) => {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const [loading, setLoading] = useState(false);
	const token = useAppSelector(state => state.auth.token);

	const initialValues: IHistoryBody = {
		comment: '',
	};

	const onSubmit = async (values: IHistoryBody): Promise<void> => {
		try {
			setLoading(true);
			const { data } = await axios.post('/histories', values, {
				headers: { Authorization: `Bearer ${token}` },
			});
			if (data.status === 'success') {
				dispatch(addHistory(data.data.history));
				dispatch(setJobsDone([]));
				setValues(initialValues);
				setLoading(false);
				router.push('/history');
			}
			return;
		} catch (error: any) {
			setErrors(error?.response?.data?.errors);
			setLoading(false);
		}
	};

	const { values, setValues, handleChange, handleSubmit, errors, setErrors } =
		useFormik<IHistoryBody>({
			initialValues,
			onSubmit,
		});

	return (
		<form className='w-full flex flex-col items-center px-1' onSubmit={handleSubmit} noValidate>
			<p className='text-gray-600 text-lg '>Short Comment:</p>
			<input
				autoComplete='off'
				type='text'
				className='mt-2 placeholder:text-gray-400 block w-full rounded-xl shadow-md focus:border-0 focus:ring-green-600 focus:ring-2 h-[42px] tracking-wider text-center'
				name='comment'
				placeholder='ex: Buy the toys'
				value={values.comment}
				onChange={handleChange}
			/>
			{errors && errors.comment && <p className='text-red-500 mt-2'>{errors.comment}</p>}
			<button
				type='submit'
				disabled={loading}
				className='mt-6 hover:text-green-400 hover:border-green-400 hover:shadow-xl transition-all duration-300 border-green-600 border text-green-600 py-2 px-5 rounded-lg shadow-md tracking-wider flex items-center'
			>
				<Image src='/images/pickup.png' className='rotate-12' width={36} height={36} alt='mop' />
				<span className='block ml-2 text-lg '>{`Pickup ${totalStars} Stars`}</span>
			</button>
		</form>
	);
};

export default GotStarsButton;
