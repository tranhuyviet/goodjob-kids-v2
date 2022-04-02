import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
	return (
		<div>
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

export default Home;
