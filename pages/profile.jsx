import { AiOutlineHome } from 'react-icons/ai';
import { BiCategory } from 'react-icons/bi';
import { GrHistory } from 'react-icons/gr';
import { CgProfile } from 'react-icons/cg';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useState, useEffect } from 'react';

import styles from '../components/profile/profile.module.scss';
import axios from 'axios';
import { toast } from 'react-toastify';
import Image from 'next/image';
const Profile = () => {
	const [user, setUser] = useState();
	const fetchUserInfo = async () => {
		try {
			const response = await axios.get('http://localhost:4000/users/profile', {
				withCredentials: true,
			});
			// console.log(response.data);
			setUser(response.data);
		} catch (err) {
			toast.error(err.response.data.message);
		}
	};
	console.log(user);

	useEffect(() => {
		fetchUserInfo();
	}, []);

	const handleSubmit = async event => {
		event.preventDefault();
		const response = await axios.patch('http://localhost:4000/users/profile', user, {
			withCredentials: true,
		});
		setUser(response.data);
	};
	const router = useRouter();
	return (
		<>
			<h1 className={styles.topic}>
				<Link href="/Home">
					<a className={styles.heading}>
						<span className={styles.firstname}>Easy</span>drive
					</a>
				</Link>
			</h1>

			<h1 className={styles.head}>Profile</h1>
			<Image src="/photos/car.svg" alt="profile" width={'400px'} height={'200px'} />
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="input">First Name:</label>
					<input
						id="input"
						type="text"
						value={user?.firstName ?? ''}
						onChange={event => {
							setUser({ ...user, firstName: event.target.value });
						}}
					/>
				</div>
				<div>
					<label htmlFor="input">Last Name:</label>
					<input
						id="input1"
						type="text"
						value={user?.lastName ?? ''}
						onChange={event => {
							setUser({ ...user, lastName: event.target.value });
						}}
					/>
				</div>
				<div>
					<label htmlFor="input">Email:</label>
					<input
						id="input2"
						type="email"
						value={user?.email ?? ''}
						onChange={event => {
							setUser({ ...user, email: event.target.value });
						}}
					/>
				</div>
				<button
					onClick={() => {
						router.push('/Main');
					}}
				>
					Log Out
				</button>

				<button type="submit">Update Profile</button>
			</form>

			<nav className={styles.navbar}>
				<AiOutlineHome
					className={styles.icn}
					onClick={() => {
						router.push('/Home');
					}}
				/>

				<BiCategory
					className={styles.icn}
					onClick={() => {
						router.push('/packages');
					}}
				/>

				<GrHistory
					className={styles.icn}
					onClick={() => {
						router.push('/History');
					}}
				/>

				<CgProfile
					className={styles.icn}
					onClick={() => {
						router.push('');
					}}
				/>
			</nav>
		</>
	);
};
export default Profile;
