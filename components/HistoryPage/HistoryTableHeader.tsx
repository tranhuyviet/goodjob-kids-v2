import React from 'react';

const HistoryTableHeader = () => {
	return (
		<div className='grid grid-cols-12 border bg-red-400 py-3 rounded-t-xl text-gray-100'>
			<p className='text-center col-span-3 '>Date</p>
			<p className='text-center col-span-3 -ml-6'>Picked Up Stars</p>
			<p className='text-center col-span-5 -ml-10'>Comments</p>
		</div>
	);
};

export default HistoryTableHeader;
