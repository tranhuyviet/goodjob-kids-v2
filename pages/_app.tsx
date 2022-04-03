import { Provider } from 'react-redux';
import axios from 'axios';
import '../styles/tailwind.css';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import { store } from '../redux/store';

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
		<Provider store={store}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</Provider>
	);
};

export default MyApp;
