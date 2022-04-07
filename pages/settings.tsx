import React from 'react';
import classNames from 'classnames';
import jwt from 'jsonwebtoken';
import ReactLoading from 'react-loading';
import Image from 'next/image';
import { GetServerSideProps, NextPage } from 'next';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { IUserWithJobsDone } from '../utils/types';
import { signup } from '../redux/slices/userSlice';
import LoginForm from '../components/SettingsPage/LoginForm';
import EditNameForm from '../components/SettingsPage/EditNameForm';

const SettingsPage: NextPage<{ user: IUserWithJobsDone; token: string }> = ({ user, token }) => {
	const dispatch = useAppDispatch();
	const { isLoggedin } = useAppSelector(state => state.auth);

	if (!isLoggedin) {
		dispatch(signup({ user, token }));
	}
	return (
		<div className='container min-h-[calc(100vh-68px)] shadow-md pt-6'>
			<EditNameForm />
			<LoginForm />
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
