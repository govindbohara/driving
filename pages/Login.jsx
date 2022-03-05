import styles from '../components/Login/login.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import { useState } from 'react';
import { BiHide } from 'react-icons/bi';

import { MdVisibility } from 'react-icons/md';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
const Login = () => {
	const router = useRouter();
	const [inputType, setInputType] = useState('password');
	const showPassword = event => {
		event.preventDefault();
		setInputType(inputType === 'password' ? 'text' : 'password');
	};
	const handleSubmit = async event => {
		event.preventDefault();
		const formData = new FormData(event.target);
		const json = Object.fromEntries(formData);

		// console.log(formData);
		console.log(json);
		try {
			await axios.post('http://localhost:4000/users/login', json, {
				withCredentials: true,
			});
			toast.success('Logged in successfully.');
			router.replace('/Home');
		} catch (error) {
			// console.log(error.response.data.message);
			toast.error(error.response.data.message);
		}
	};
	return (
		<>
			<h1 className={styles.topic}>
				<Link href="/">
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

				<form className={styles.form} onSubmit={handleSubmit}>
					<input
						className={styles.email}
						type="text"
						placeholder="Email"
						name="email"
					/>
					<div className={styles.passcont}>
						<input
							className={styles.password}
							type={inputType}
							placeholder="**********"
							name="password"
						/>
						<button className={styles.icon} onClick={showPassword}>
							{inputType === 'password' ? <MdVisibility /> : <BiHide />}
						</button>
					</div>
					<div className={styles.forgotdiv}>
						<Link href="https://nextjs.org/learn/basics/navigate-between-pages/link-component">
							<a className={styles.forget}>Forgot Password?</a>
						</Link>
					</div>
					<button className={styles.btn} type="submit">
						login
						{/* <Link href={'/Home'}>Login</Link> */}
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
