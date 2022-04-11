import styles from '../components/main/home.module.scss';
import Link from 'next/link';
import { AiOutlineHome } from 'react-icons/ai';
import { BiCategory } from 'react-icons/bi';
import { GrHistory } from 'react-icons/gr';
import { CgProfile } from 'react-icons/cg';
import { useRouter } from 'next/router';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

const Home = () => {
	const router = useRouter();
	const [user, setUser] = useState();
	const fetchUserInfo = async () => {
		try {
			const response = await axios.get('http://localhost:4000/users/profile', {
				withCredentials: true,
			});
			console.log(response.data);
			setUser(response.data);
		} catch (err) {
			// toast.error(err.response.data.message);
			console.log(err);
		}
	};

	useEffect(() => {
		const packageName = router.query.packagename;
		if (packageName) {
			toast.success('Package Subscribed Successfully');
		}
	}, [router.query.packagename]);
	useEffect(() => {
		fetchUserInfo();
	}, []);

	return (
		<>
			<div className={styles.header}>
				<h1 className={styles.topic}>
					<Link href="/Home">
						<a className={styles.heading}>
							<span className={styles.firstname}>Easy</span>drive
						</a>
					</Link>
				</h1>
				<div>
					<i>
						<GiHamburgerMenu />
					</i>
				</div>
			</div>
			<h1>
				<span>Hello </span>
				<span>{user?.firstName.toUpperCase() ?? ''},</span>
			</h1>
			<div>
				<p>Ongoing Subscriptions.</p>
			</div>
			<div>
				<p>Recommended Subscriptions.</p>
			</div>
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
						router.push('/profile');
					}}
				/>
			</nav>
		</>
	);
};
export default Home;
