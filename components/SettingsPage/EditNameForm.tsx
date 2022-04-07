import React from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import { useAppSelector } from '../../redux/hooks';

const EditNameForm = () => {
	const user = useAppSelector(state => state.auth.user);
	return (
		<div>
			<div className='flex items-center'>
				<p className='mr-4 text-lg'>Your name:</p>
				<input
					autoComplete='off'
					type='text'
					className='placeholder:text-gray-300 block  rounded-xl shadow-md focus:border-0 focus:ring-green-600 focus:ring-2 h-[42px] tracking-wider text-left flex-1'
					name='comment'
					value={user.name}
					// onChange={handleChange}
				/>
				<button type='submit' className={classNames('ml-3 mt-[6px]')}>
					<Image src='/images/save.png' width={22} height={22} alt='mop' />
				</button>
			</div>
		</div>
	);
};

export default EditNameForm;
