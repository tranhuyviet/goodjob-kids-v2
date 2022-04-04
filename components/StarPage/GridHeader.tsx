import React from 'react';

const GridHeader = () => {
	return (
		<div className='grid grid-cols-12 border bg-yellow-400 py-3 rounded-t-xl'>
			<p className='text-center col-span-4 '>Time</p>
			<p className='text-center col-span-5 '>Jobs Done</p>
			<p className='col-span-2 -ml-[8px]'>Got Stars</p>
		</div>
	);
};

export default GridHeader;
