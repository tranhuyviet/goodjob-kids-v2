import React from 'react';

const HistoryTableHeader = () => {
	return (
		<div className='grid grid-cols-12 border bg-yellow-400 py-3 rounded-t-xl'>
			<p className='text-center col-span-3 '>Date</p>
			<p className='text-center col-span-3 -ml-6'>Picked Up Stars</p>
			<p className='text-center col-span-5 '>Comments</p>
		</div>
	);
};

export default HistoryTableHeader;
