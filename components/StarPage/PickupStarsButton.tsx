import React, { useState } from 'react';
import Image from 'next/image';
import ConfirmPickupDialog from './ConfirmPickupDialog';

const PickupStarsButton: React.FC<{ totalStars: number }> = ({ totalStars }) => {
	const [isOpenConfirmPickupDialog, setIsOpenConfirmPickupDialog] = useState(false);

	const handleOpenConfirmPickupDialog = () => {
		setIsOpenConfirmPickupDialog(true);
	};

	const handleCloseConfirmPickupDialog = () => {
		setIsOpenConfirmPickupDialog(false);
	};

	return (
		<div>
			<button
				onClick={handleOpenConfirmPickupDialog}
				type='button'
				className='hover:text-green-400 hover:border-green-400 hover:shadow-xl transition-all duration-300 border-green-600 border text-green-600 py-2 px-5 rounded-lg shadow-md tracking-wider flex items-center'
			>
				<Image src='/images/pickup.png' className='rotate-12' width={36} height={36} alt='mop' />
				<span className='block ml-2 text-lg '>{`Pickup ${totalStars} Stars`}</span>
			</button>
			{isOpenConfirmPickupDialog && (
				<ConfirmPickupDialog
					handleCloseConfirmPickupDialog={handleCloseConfirmPickupDialog}
					totalStars={totalStars}
				/>
			)}
		</div>
	);
};

export default PickupStarsButton;
