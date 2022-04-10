import type { GetServerSideProps, GetStaticProps, NextPage } from 'next';
import jwt from 'jsonwebtoken';
import Head from 'next/head';
import axios from 'axios';
import { IUserWithJobsDone } from '../utils/types';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { signup } from '../redux/slices/userSlice';
import JobButtonList from '../components/HomePage/JobButtonList';

const HomePage: NextPage<{ user: IUserWithJobsDone; token: string }> = ({ user, token }) => {
	const dispatch = useAppDispatch();
	const isLoggedin = useAppSelector(state => state.auth.isLoggedin);

	if (!isLoggedin) {
		dispatch(signup({ user, token }));
	}

	// console.log('HOME PAGE RENDER');

	return (
		<div className='container min-h-[calc(100vh-68px)] shadow-md'>
			<Head>
				<title>Good Job Kids</title>
				<meta name='description' content='Good Job Kids' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main>
				<JobButtonList />
			</main>
		</div>
	);
};

export default HomePage;

export const getServerSideProps: GetServerSideProps = async context => {
	const token = context.req.cookies.goodjobkids;
	try {
		const user = jwt.verify(token, process.env.JWT_SECRET as string);
		return { props: { user, token } };
	} catch (error) {
		return { redirect: { destination: '/signup', permanent: false } };
	}
};
