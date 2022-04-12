import { GetServerSideProps, NextPage } from 'next';
import jwt from 'jsonwebtoken';
import useSWR from 'swr';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { signup } from '../redux/slices/userSlice';
import { IHistoryPopulated, IUserWithJobsDone } from '../utils/types';
import HistoryTableHeader from '../components/HistoryPage/HistoryTableHeader';
import HistoryTableRow from '../components/HistoryPage/HistoryTableRow';
import fetchApi from '../utils/fetchApi';
import { setHistories } from '../redux/slices/historySlice';
import ErrorFetching from '../components/ErrorFetching';
import Loading from '../components/Loading';

const HistoryPage: NextPage<{ user: IUserWithJobsDone; token: string }> = ({ user, token }) => {
	const dispatch = useAppDispatch();
	const histories = useAppSelector(state => state.history.histories);
	const { isLoggedin } = useAppSelector(state => state.auth);

	if (!isLoggedin) {
		dispatch(signup({ user, token }));
	}

	const { data, error } = useSWR(token ? ['/histories', token] : null, fetchApi);

	console.log(data);
	useEffect(() => {
		// dispatch(setHistories((data?.data?.histories as IHistoryPopulated[]) || []));
	}, [dispatch]);

	if (error) return <ErrorFetching />;
	if (!data) return <Loading />;

	console.log('HISTORY PAGE - RENDER');

	return (
		<div className='container min-h-[calc(100vh-68px)] shadow-md pt-6'>
			{histories && histories.length > 0 ? (
				<>
					<HistoryTableHeader />
					{histories.map(history => (
						<HistoryTableRow key={history._id} history={history} />
					))}
				</>
			) : (
				<p className='text-center text-xl mt-2'>You did not pick up any stars.</p>
			)}
		</div>
	);
};

export default HistoryPage;

export const getServerSideProps: GetServerSideProps = async context => {
	const token = context.req.cookies.goodjobkids;
	try {
		const user = jwt.verify(token, process.env.JWT_SECRET as string);
		return { props: { user, token } };
	} catch (error) {
		return { redirect: { destination: '/signup', permanent: false } };
	}
};
