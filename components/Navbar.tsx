import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAppSelector } from '../redux/hooks';

const Navbar = () => {
	const router = useRouter();
	const user = useAppSelector(state => state.auth.user);

	console.log('NAVBAR - RENDER');

	return (
		<nav className='h-[68px] container flex justify-between items-center bg-gray-100 shadow-md'>
			<div className='flex gap-x-4'>
				<Link href='/'>
					<a className='hover:cursor-pointer relative hover:nav-link-active' href='href'>
						<Image src='/images/home.png' width={32} height={32} alt='mop' />
						<p
							className={classNames(
								`text-center ${router.pathname === '/' ? 'nav-link-active' : ''}`,
							)}
						>
							Home
						</p>
					</a>
				</Link>

				<Link href='/stars'>
					<a
						className='relative w-[38px] h-[38px] block hover:cursor-pointer hover:nav-link-active'
						href='href'
					>
						<div className='w-[38px] h-[38px] flex justify-center items-center'>
							<Image src='/images/star.png' width={38} height={38} alt='mop' />
						</div>
						<div className='absolute right-0 top-0 w-[38px] h-[38px] flex justify-center items-center'>
							<p className='text-gray-700 font-bold text-md'>{user.totalStars}</p>
						</div>
						<p
							className={classNames(
								`text-center ${router.pathname === '/stars' ? 'nav-link-active' : ''}`,
							)}
						>
							Stars
						</p>
					</a>
				</Link>

				<Link href='/history'>
					<a className='hover:cursor-pointer hover:nav-link-active' href='href'>
						<Image src='/images/history.png' className='' width={32} height={32} alt='mop' />
						<p
							className={classNames(
								`text-center -ml-[6px] ${router.pathname === '/history' ? 'nav-link-active' : ''}`,
							)}
						>
							History
						</p>
					</a>
				</Link>
			</div>
			<div>
				<p className='text-red-400 text-xl flex items-center'>
					{' '}
					<Image src='/images/hello.png' width={38} height={38} alt='mop' />
					<span className=' tracking-wider uppercase text-red-400 ml-2'>{user.name}</span>
				</p>{' '}
			</div>
		</nav>
	);
};

export default Navbar;
