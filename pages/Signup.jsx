import styles from '../components/signup/signup.module.scss';
import Image from 'next/image';
import { MdVisibility } from 'react-icons/md';
import Link from 'next/link';
const SignUp = () => {
	return (
		<>
			<h1 className={styles.topic}>
				<Link href="./">
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

			<form className={styles.signup}>
				<div className={styles.name}>
					<label className={styles.label1}> Full Name</label>
					<input className={styles.input1} type="text" />
				</div>
				<div className={styles.email}>
					<label className={styles.label2}>Email address</label>
					<input className={styles.input2} type="text" />
				</div>
				<div className={styles.password}>
					<label className={styles.label3}>Password</label>
					<div className={styles.passcont}>
						<input className={styles.input3} type="password" />
						<button className={styles.icon}>
							<MdVisibility />
						</button>
					</div>
				</div>
				<div className={styles.check}>
					<input type="checkbox" />
					<label className={styles.label}>
						I agree to the <span className={styles.spantext}>terms</span> and{' '}
						<span className={styles.spantext}>conditions.</span>
					</label>
				</div>
				<button className={styles.btn} type="submit">
					Sign Up
				</button>
			</form>
		</>
	);
};
export default SignUp;
