import React, { useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import Image from 'next/image';
import classNames from 'classnames';
import ReactLoading from 'react-loading';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { ISignupBody } from '../../utils/types';
import { signup } from '../../redux/slices/userSlice';
import { signupValidate } from '../../utils/validate';

const EditNameForm = () => {
	const dispatch = useAppDispatch();
	const token = useAppSelector(state => state.auth.token);
	const user = useAppSelector(state => state.auth.user);
	const [isChangeName, setIsChangeName] = useState(false);
	const [loading, setLoading] = useState(false);

	const initialValues: ISignupBody = {
		name: user.name,
	};

	const onSubmit = async (values: ISignupBody): Promise<void> => {
		try {
			setLoading(true);
			const { data } = await axios.put('/users', values, {
				headers: { Authorization: `Bearer ${token}` },
			});
			if (data.status === 'success') {
				dispatch(signup({ user: data.data.user, token: data.data.token }));
				setLoading(false);
			}
			// setValues(initialValues);
		} catch (error: any) {
			setErrors(error?.response?.data?.errors);
			setLoading(false);
		}
	};

	const { values, handleChange, handleSubmit, errors, setErrors } = useFormik<ISignupBody>({
		initialValues,
		onSubmit,
		validationSchema: signupValidate,
	});

	return (
		<div>
			<form className='flex w-full items-center' onSubmit={handleSubmit}>
				<p className='mr-4 text-lg'>Your name:</p>
				<input
					autoComplete='off'
					type='text'
					className=' placeholder:text-gray-300 block  rounded-xl shadow-md focus:border-0 focus:ring-green-600 focus:ring-2 h-[42px] tracking-wider text-left flex-1'
					name='name'
					value={values.name}
					onChange={e => {
						handleChange(e);
						setIsChangeName(true);
					}}
				/>

				<button
					type='submit'
					className={classNames(
						'ml-3 mt-[6px]',
						isChangeName ? '' : 'cursor-not-allowed opacity-50',
					)}
					disabled={!isChangeName || !!errors.name === true}
				>
					{loading ? (
						<ReactLoading type='spinningBubbles' height={20} width={20} color='#6FC2CB' />
					) : (
						<Image src='/images/save.png' width={22} height={22} alt='mop' />
					)}
				</button>
			</form>
			<div>
				{errors && errors.name && <p className='text-red-500 mt-2 text-center'>{errors.name}</p>}
			</div>
		</div>
	);
};

export default EditNameForm;
