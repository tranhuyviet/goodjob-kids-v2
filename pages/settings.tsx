import React from 'react';
import classNames from 'classnames';
import jwt from 'jsonwebtoken';
import ReactLoading from 'react-loading';
import Image from 'next/image';
import { GetServerSideProps, NextPage } from 'next';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { IUserWithJobsDone } from '../utils/types';
import { signup } from '../redux/slices/userSlice';

const SettingsPage: NextPage<{ user: IUserWithJobsDone; token: string }> = ({ user, token }) => {
	const dispatch = useAppDispatch();
	const { isLoggedin } = useAppSelector(state => state.auth);

	if (!isLoggedin) {
		dispatch(signup({ user, token }));
	}
	return (
		<div className='container min-h-[calc(100vh-68px)] shadow-md pt-6'>
			<div className='flex items-center'>
				<p className='mr-4'>Your name:</p>
				<input
					autoComplete='off'
					type='text'
					className='placeholder:text-gray-300 block  rounded-xl shadow-md focus:border-0 focus:ring-green-600 focus:ring-2 h-[42px] tracking-wider text-left flex-1'
					name='comment'
					value={user.name}
					// onChange={handleChange}
				/>
				<button type='submit' className={classNames('ml-3 mt-[6px]')}>
					<Image src='/images/save.png' width={22} height={22} alt='mop' />
				</button>
			</div>

			<div className='mt-4'>
				<p>
					Your code: <span className='text-lg text-red-400'>{user.userName}</span>
				</p>
			</div>

			<div className='p-4 mt-6 shadow-lg flex flex-col justify-center items-center border border-green-600 rounded-lg'>
				<p className='mt-2 text-lg'>{`Want to login to someone's account?`}</p>
				<p className='mt-1 text-base text-gray-500'>{`Enter someone'scode here:`}</p>
				<input
					autoComplete='off'
					type='text'
					className='mt-4 text-center placeholder:text-gray-300 block  rounded-xl shadow-md focus:border-0 focus:ring-green-600 focus:ring-2 h-[42px] tracking-wider w-3/4'
					name='comment'
					placeholder='ex: kit-1234'
					// value={user.name}
					// onChange={handleChange}
				/>
				<button
					className='mt-4 py-1 px-7 rounded-xl border shadow-md bg-green-600 text-gray-50 text-lg tracking-wider'
					type='button'
				>
					Login
				</button>
			</div>
		</div>
	);
};

export default SettingsPage;

export const getServerSideProps: GetServerSideProps = async context => {
	const token = context.req.cookies.goodjobkids;
	try {
		const user = jwt.verify(token, process.env.JWT_SECRET as string);
		return { props: { user, token } };
	} catch (error) {
		return { redirect: { destination: '/signup', permanent: false } };
	}
};
