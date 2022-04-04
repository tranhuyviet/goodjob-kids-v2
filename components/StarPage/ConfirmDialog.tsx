import React from 'react';
import { IRemoveJobVariables } from '../../utils/types';

const ConfirmDialog: React.FC<{
	confirmNoRemoveJob: () => void;
	confirmYesRemoveJob: () => void;
	variables: IRemoveJobVariables;
}> = ({ confirmNoRemoveJob, confirmYesRemoveJob, variables }) => {
	return (
		<div>
			<div
				className='absolute inset-0 container max-h-screen flex items-center justify-center backdrop-brightness-[.4]'
				onClick={confirmNoRemoveJob}
			>
				<div className='w-3/4 h-[160px] bg-green-200 text-center rounded-3xl shadow-2xl'>
					<p className='text-lg mt-4'>Are you sure to remove</p>
					<p className='text-2xl font-bold tracking-wider mt-2 capitalize'>
						{variables?.jobDoneName} ???
					</p>
					<div className='flex mt-4 justify-end pr-4'>
						<button
							className='py-1 px-7 rounded-xl border shadow-md bg-green-600 text-gray-50 text-lg tracking-wider'
							type='button'
							onClick={confirmYesRemoveJob}
						>
							Yes
						</button>
						<button
							className='ml-4 py-1 px-7 rounded-xl border shadow-md bg-red-600 text-gray-50 text-lg tracking-wider'
							type='button'
							onClick={confirmNoRemoveJob}
						>
							No
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ConfirmDialog;
