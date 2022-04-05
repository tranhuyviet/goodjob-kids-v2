import { GetServerSideProps, NextPage } from 'next';
import jwt from 'jsonwebtoken';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { signup } from '../redux/slices/userSlice';
import { IUserWithJobsDone } from '../utils/types';
import HistoryTableHeader from '../components/HistoryPage/HistoryTableHeader';
import HistoryTableRow from '../components/HistoryPage/HistoryTableRow';

const HistoryPage: NextPage<{ user: IUserWithJobsDone; token: string }> = ({ user, token }) => {
	const dispatch = useAppDispatch();
	const histories = useAppSelector(state => state.history.histories);
	const { isLoggedin } = useAppSelector(state => state.auth);

	if (!isLoggedin) {
		dispatch(signup({ user, token }));
	}

	return (
		<div className='container min-h-[calc(100vh-68px)] shadow-md pt-6'>
			<HistoryTableHeader />
			{histories &&
				histories.map(history => <HistoryTableRow key={history._id} history={history} />)}
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
