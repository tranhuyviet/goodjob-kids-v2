import type { GetServerSideProps, NextPage } from 'next';
import jwt from 'jsonwebtoken';
import Head from 'next/head';

const HomePage: NextPage = () => {
	console.log('HOME PAGE RENDER');

	return (
		<div className='container min-h-[calc(100vh-68px)] shadow-md'>
			<Head>
				<title>Good Job Kids</title>
				<meta name='description' content='Good Job Kids' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main>
				<h1 className='text-blue-400'>Hello Kids</h1>
			</main>
		</div>
	);
};

export default HomePage;

export const getServerSideProps: GetServerSideProps = async context => {
	const token = context.req.cookies.goodjobkids;
	try {
		jwt.verify(token, process.env.JWT_SECRET as string);
		return { props: {} };
	} catch (error) {
		return { redirect: { destination: '/signup', permanent: false } };
	}
};
