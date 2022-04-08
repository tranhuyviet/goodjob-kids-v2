import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import classNames from 'classnames';
import ConfirmLoginDialog from './ConfirmLoginDialog';
import { ILoginByUserName } from '../../utils/types';
import { userNameValidate } from '../../utils/validate';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { signup } from '../../redux/slices/userSlice';

const LoginForm = () => {
	const token = useAppSelector(state => state.auth.token);
	const user = useAppSelector(state => state.auth.user);
	const dispatch = useAppDispatch();
	const [isOpenConfirmLoginDialog, setIsOpenConfirmLoginDialog] = useState(false);
	const [loading, setLoading] = useState(false);

	const initialValues: ILoginByUserName = {
		userName: '',
	};

	const handleOpenLoginDialog = () => {
		setIsOpenConfirmLoginDialog(true);
	};

	const handleCloseLoginDialog = () => {
		setIsOpenConfirmLoginDialog(false);
	};

	const onSubmit = async (values: ILoginByUserName): Promise<void> => {
		try {
			setLoading(true);
			handleCloseLoginDialog();
			const { data } = await axios.post('/auth/token', values, {
				headers: { Authorization: `Bearer ${token}` },
			});
			if (data.status === 'success') {
				dispatch(signup({ user: data.data.user, token: data.data.token }));
				setLoading(false);
			}
			setValues(initialValues);
		} catch (error: any) {
			setErrors(error?.response?.data?.errors);
			setLoading(false);
		}
	};

	const { values, setValues, handleChange, handleSubmit, errors, setErrors } =
		useFormik<ILoginByUserName>({
			initialValues,
			onSubmit,
			validationSchema: userNameValidate,
		});

	useEffect(() => {
		setValues(initialValues);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div>
			<div className='mt-4'>
				<p className='text-lg'>
					Your code: <span className='text-lg text-red-400'>{user.userName}</span>
				</p>
				<p className='mt-1 text-md text-gray-400'>
					(Please save your code if you want to login this account again)
				</p>
			</div>
			<form className='p-4 mt-6 shadow-lg flex flex-col justify-center items-center border border-green-600 rounded-lg'>
				<p className='mt-2 text-lg text-green-600 font-bold'>{`Want to login to someone's account?`}</p>
				<p className='mt-1 text-base text-gray-500'>{`Enter someone'scode here:`}</p>

				<input
					autoComplete='off'
					type='text'
					className='mt-4 text-center placeholder:text-gray-300 block  rounded-xl shadow-md focus:border-0 focus:ring-green-600 focus:ring-2 h-[42px] tracking-wider w-3/4'
					name='userName'
					placeholder='ex: kit-1234'
					value={values.userName}
					onChange={handleChange}
				/>
				{errors && (errors.userName || errors.global) && (
					<p className='text-red-500 mt-2'>{errors.userName || errors.global}</p>
				)}

				<button
					className={classNames(
						'mt-4 py-1 px-7 rounded-xl border shadow-md bg-green-600 text-gray-50 text-lg tracking-wider',
						!!errors && !!errors.userName ? 'bg-gray-400 cursor-not-allowed' : '',
					)}
					type='button'
					onClick={handleOpenLoginDialog}
					disabled={!!errors && !!errors.userName}
				>
					<span>Login</span>
				</button>
				{isOpenConfirmLoginDialog && (
					<ConfirmLoginDialog
						handleSubmit={handleSubmit}
						handleCloseLoginDialog={handleCloseLoginDialog}
						userName={values.userName}
						loading={loading}
					/>
				)}
			</form>
		</div>
	);
};

export default LoginForm;
