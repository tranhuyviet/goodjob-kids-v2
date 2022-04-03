import React, { useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import ReactLoading from 'react-loading';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { ISignupBody } from '../utils/types';

const SignupPage = () => {
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const initialValues: ISignupBody = {
		name: '',
	};

	const onSubmit = async (values: ISignupBody): Promise<void> => {
		try {
			setLoading(true);
			const { data } = await axios.post('/auth', values);

			if (data.status === 'success') {
				router.push('/');
				setLoading(false);
			}

			return;
		} catch (error: any) {
			setErrors(error?.response?.data?.errors);
			setLoading(false);
		}
	};

	const { values, handleChange, handleSubmit, errors, setErrors } = useFormik<ISignupBody>({
		initialValues,
		onSubmit,
	});

	console.log('SIGNUP PAGE RENDER');

	return (
		<div className='container h-screen shadow-md absolute inset-0 bg-blue-200 flex justify-center items-center'>
			<div className='text-center w-full flex flex-col justify-center items-center'>
				<p className='text-2xl tracking-wider text-green-600'>Enter your name</p>
				<form className='mt-2 w-full flex flex-col items-center' onSubmit={handleSubmit} noValidate>
					<input
						autoComplete='off'
						type='text'
						className='block w-3/4 rounded-2xl shadow-sm focus:border-0 focus:ring-green-600 focus:ring-2 h-[42px] tracking-wider text-center'
						name='name'
						value={values.name}
						onChange={handleChange}
					/>
					{errors && errors.name && <p className='text-red-500 mt-2'>{errors.name}</p>}
					<button
						className='py-1 px-7 rounded-xl border shadow-md bg-green-600 text-gray-50 text-lg tracking-wider mt-4 flex items-center'
						type='submit'
						disabled={loading}
					>
						{loading && <ReactLoading type='spinningBubbles' height={20} width={20} />}
						<span className='ml-3'>Submit</span>
					</button>
				</form>
			</div>
		</div>
	);
};

export default SignupPage;

export const getServerSideProps: GetServerSideProps = async context => {
	const token = context.req.cookies.goodjobkids;
	try {
		jwt.verify(token, process.env.JWT_SECRET as string);
		return { redirect: { destination: '/', permanent: false } };
	} catch (error) {
		return { props: {} };
	}
};
