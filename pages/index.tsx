import type { GetServerSideProps, NextPage } from 'next';
import jwt from 'jsonwebtoken';
import Head from 'next/head';
import { IUserWithJobsDone } from '../utils/types';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { signup } from '../redux/slices/userSlice';
import JobButtonList from '../components/HomePage/JobButtonList';

const HomePage: NextPage<{ user: IUserWithJobsDone }> = ({ user }) => {
	const dispatch = useAppDispatch();
	const isLoggedin = useAppSelector(state => state.auth.isLoggedin);

	if (!isLoggedin && user) {
		dispatch(signup(user));
	}

	console.log('HOME PAGE RENDER', user);

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
		return { props: { user } };
	} catch (error) {
		return { redirect: { destination: '/signup', permanent: false } };
	}
};
