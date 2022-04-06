import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import ReactLoading from 'react-loading';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { addHistory } from '../../redux/slices/historySlice';
import { setJobsDone } from '../../redux/slices/userSlice';
import { IHistoryBody } from '../../utils/types';

const ConfirmPickupDialog: React.FC<{
	handleCloseConfirmPickupDialog: () => void;
	totalStars: number;
}> = ({ handleCloseConfirmPickupDialog, totalStars }) => {
	const token = useAppSelector(state => state.auth.token);
	const dispatch = useAppDispatch();

	const [loading, setLoading] = useState(false);
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
				//  router.push('/history');
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
		<div>
			<div className='absolute inset-0 container max-h-screen flex items-center justify-center backdrop-brightness-[.4]'>
				<form
					className='w-3/4 bg-green-200 text-center rounded-3xl shadow-2xl px-4 py-4'
					onSubmit={handleSubmit}
					noValidate
				>
					<p className='text-lg'>Wanna pick up {totalStars} stars?</p>
					<div className='mt-4'>
						<p className='text-gray-600 text-lg '>Short Comment:</p>
						<input
							autoComplete='off'
							type='text'
							className='mt-2 placeholder:text-gray-300 block w-full rounded-xl shadow-md focus:border-0 focus:ring-green-600 focus:ring-2 h-[42px] tracking-wider text-center'
							name='comment'
							placeholder='ex: Buy the toys'
							value={values.comment}
							onChange={handleChange}
						/>
						{errors && errors.comment && <p className='text-red-500 mt-2'>{errors.comment}</p>}
					</div>
					<div className='flex mt-4 justify-end'>
						<button
							className='py-1 px-7 rounded-xl border shadow-md bg-green-600 text-gray-50 text-lg tracking-wider flex justify-between items-center'
							type='submit'
						>
							{loading && <ReactLoading type='spinningBubbles' height={20} width={20} />}
							<span className='ml-2'>Yes</span>
						</button>
						<button
							className='ml-4 py-1 px-7 rounded-xl border shadow-md bg-red-600 text-gray-50 text-lg tracking-wider'
							type='button'
							onClick={handleCloseConfirmPickupDialog}
						>
							No
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default ConfirmPickupDialog;
