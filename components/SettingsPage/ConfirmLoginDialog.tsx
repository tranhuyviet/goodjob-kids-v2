import React from 'react';
import ReactLoading from 'react-loading';
import { useAppSelector } from '../../redux/hooks';
import { ILoginByUserName } from '../../utils/types';

const ConfirmLoginDialog: React.FC<{
	userName: string;
	handleCloseLoginDialog: () => void;
	handleSubmit: () => void;
	loading: boolean;
}> = ({ handleCloseLoginDialog, userName, handleSubmit, loading }) => {
	const yourCode = useAppSelector(state => state.auth.user.userName);
	return (
		<div>
			<div
				className='absolute inset-0 container max-h-screen flex items-center justify-center backdrop-brightness-[.4]'
				onClick={handleCloseLoginDialog}
			>
				<div className='w-3/4 py-4 bg-green-200 text-center rounded-3xl shadow-2xl'>
					<p className='text-lg '>Are you sure to login with the code:</p>
					<p className='text-2xl font-bold tracking-wider mt-2'>{userName} ?</p>
					<p className='text-sm text-gray-400 font-bold tracking-wider mt-2'>
						(Remember save the code: <span className='text-red-400'>{yourCode}</span>)
					</p>
					<div className='flex mt-4 justify-end pr-4'>
						<button
							className='py-1 px-7 rounded-xl border shadow-md bg-green-600 text-gray-50 text-lg tracking-wider flex items-center'
							type='button'
							onClick={handleSubmit}
						>
							{loading && <ReactLoading type='spinningBubbles' height={20} width={20} />}
							<span className='ml-2'>Yes</span>
						</button>
						<button
							className='ml-4 py-1 px-7 rounded-xl border shadow-md bg-red-600 text-gray-50 text-lg tracking-wider'
							type='button'
							onClick={handleCloseLoginDialog}
						>
							No
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ConfirmLoginDialog;
