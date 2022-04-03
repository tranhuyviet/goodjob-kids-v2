import axios from 'axios';
import '../styles/tailwind.css';
import jwt from 'jsonwebtoken';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
// axios seting
const url =
	process.env.NODE_ENV === 'production'
		? 'https://goodjobkids.vercel.app/api'
		: 'http://localhost:3000/api';
axios.defaults.baseURL = url;
axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.put['Content-Type'] = 'application/json';

const MyApp = ({ Component, pageProps }: AppProps) => {
	return (
		<Layout>
			<Component {...pageProps} />
		</Layout>
	);
};

export default MyApp;
