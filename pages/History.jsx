//@ts-check
import styles from '../components/History/history.module.scss';
import axios from 'axios';
import Link from 'next/link';
import { AiOutlineHome } from 'react-icons/ai';
import { BiCategory } from 'react-icons/bi';
import { GrHistory } from 'react-icons/gr';
import { CgProfile } from 'react-icons/cg';
import { useRouter } from 'next/router';

import { useState, useEffect } from 'react';

const History = () => {
	const [subscription, setSubscription] = useState([]);
	const router = useRouter();
	const history = subscription.map(history => {
		const subscribedDate = history.subscribedAt;
		const date = new Date(Date.parse(subscribedDate));

		const subscribedAt = date.toLocaleString();

		const expiryDate = history.expiresAt;
		const expiredate = new Date(Date.parse(expiryDate));

		const expiresAt = date.toLocaleDateString();

		return (
			<div key={history._id} className={styles.historycont}>
				<h3>{subscribedAt}</h3>
				<div>
					<span>{history.package.name}</span>
					<span>{history.package.price}</span>

					<span>{expiresAt}</span>
				</div>
				<div>
					<span>{history.package.type}</span>
				</div>
			</div>
		);
	});
	useEffect(() => {
		const fetchSubscriptions = async () => {
			const response = await axios(`http://localhost:4000/subscriptions`, {
				withCredentials: true,
			});
			// console.log(response.data);
			setSubscription(response.data);
		};

		fetchSubscriptions();
	}, []);
	console.log(subscription);

	return (
		<>
			<h1 className={styles.topic}>
				<Link href="/Home">
					<a className={styles.heading}>
						<span className={styles.firstname}>Easy</span>drive
					</a>
				</Link>
			</h1>
			<h1 className={styles.head}>History</h1>
			{history}
			<div className={styles.navbar}>
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
			</div>
		</>
	);
};
export default History;
