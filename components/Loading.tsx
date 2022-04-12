import React from 'react';
import ReactLoading from 'react-loading';

const Loading = () => {
	return (
		<div className='absolute inset-0 container h-screen flex items-center justify-center backdrop-brightness-[.4]'>
			<ReactLoading type='spinningBubbles' height={40} width={40} />
		</div>
	);
};

export default Loading;
