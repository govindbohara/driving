import styles from '../components/Login/login.module.scss';
import Image from 'next/image';
import Link from 'next/link';

import { MdVisibility } from 'react-icons/md';
const Login = () => {
	return (
		<>
			<h1 className={styles.topic}>
				<Link href="./">
					<a className={styles.heading}>
						<span className={styles.firstname}>Easy</span>drive
					</a>
				</Link>
			</h1>
			<div className={styles.login}>
				<div className={styles.img}>
					<Image
						src={'/photos/login.svg'}
						alt="Car"
						width={'450px'}
						height={'190px'}
					/>
				</div>
				<div className={styles.header}>
					<h1 className={styles.head}>Login Now</h1>
					<p className={styles.para}>Lorem ipsum dolor sit amet consectetur</p>
				</div>

				<form className={styles.form}>
					<input className={styles.email} type="text" placeholder="Email" />
					<div className={styles.passcont}>
						<input
							className={styles.password}
							type="password"
							placeholder="**********"
						/>
						<button className={styles.icon}>
							<MdVisibility />
						</button>
					</div>
					<div className={styles.forgotdiv}>
						<Link href="https://nextjs.org/learn/basics/navigate-between-pages/link-component">
							<a className={styles.forget}>Forgot Password?</a>
						</Link>
					</div>
					<button className={styles.btn} type="submit">
						Login
					</button>
				</form>
				<p className={styles.signup}>
					New to EasyDrive?
					<Link href={'/Signup'}>
						<a className={styles.sign}>Sign-Up</a>
					</Link>
				</p>
			</div>
		</>
	);
};
export default Login;
