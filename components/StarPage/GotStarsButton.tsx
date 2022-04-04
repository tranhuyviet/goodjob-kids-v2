import React from 'react';
import Image from 'next/image';

const GotStarsButton: React.FC<{ totalStars: number }> = ({ totalStars }) => {
	return (
		<button
			type='button'
			className='hover:text-green-400 hover:border-green-400 hover:shadow-xl transition-all duration-300 border-green-600 border text-green-600 py-2 px-5 rounded-lg shadow-md tracking-wider flex items-center'
		>
			<Image src='/images/pickup.png' className='rotate-12' width={36} height={36} alt='mop' />
			<span className='block ml-2 text-lg '>{`Pickup ${totalStars} Stars`}</span>
		</button>
	);
};

export default GotStarsButton;
