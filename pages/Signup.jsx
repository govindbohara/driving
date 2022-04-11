import styles from '../components/signup/signup.module.scss';
import Image from 'next/image';
import { MdVisibility } from 'react-icons/md';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { BiHide } from 'react-icons/bi';
import { toast } from 'react-toastify';
const SignUp = () => {
	const [inputType, setInputType] = useState('password');
	const [termsAccepted, setTermsAccepted] = useState(false);
	const showPassword = event => {
		event.preventDefault();
		setInputType(inputType === 'password' ? 'text' : 'password');
	};
	const handleOnChange = () => {
		setTermsAccepted(!termsAccepted);
	};

	const router = useRouter();
	const handleSubmit = async event => {
		event.preventDefault();
		const formData = new FormData(event.target);
		const json = Object.fromEntries(formData);
		// console.log(formData);
		console.log(json);
		try {
			await axios.post('http://localhost:4000/users/signup', json);

			termsAccepted === false
				? toast.error('Please accept the terms and conditions')
				: toast.success('Signed up successfully.') && router.push('/Login');
		} catch (error) {
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
			<div className={styles.img}>
				<Image
					src="/photos/signup.svg"
					alt="Signup"
					width={'450px'}
					height={'200px'}
				/>
			</div>

			<form className={styles.signup} onSubmit={handleSubmit}>
				<div className={styles.name}>
					<label className={styles.label1}> First Name</label>
					<input className={styles.input1} type="text" name="firstName" />
				</div>
				<div className={styles.name}>
					<label className={styles.label1}> Last Name</label>
					<input className={styles.input1} type="text" name="lastName" />
				</div>
				<div className={styles.email}>
					<label className={styles.label2}>Email address</label>
					<input className={styles.input2} type="text" name="email" />
				</div>
				<div className={styles.password}>
					<label className={styles.label3}>Password</label>
					<div className={styles.passcont}>
						<input className={styles.input3} type={inputType} name="password" />
						<button className={styles.icon} onClick={showPassword}>
							{inputType === 'password' ? <MdVisibility /> : <BiHide />}
						</button>
					</div>
				</div>
				<div className={styles.check}>
					<input type="checkbox" checked={termsAccepted} onChange={handleOnChange} />
					<label className={styles.label}>
						I agree to the <span className={styles.spantext}>terms</span> and{' '}
						<span className={styles.spantext}>conditions.</span>
					</label>
				</div>
				<button className={styles.btn} type="submit">
					Sign-Up
				</button>
			</form>
		</>
	);
};
export default SignUp;
