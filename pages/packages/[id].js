import styles from '../../components/package/packagedetails.module.scss';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { AiOutlineHome } from 'react-icons/ai';
import { BiCategory } from 'react-icons/bi';
import { GrHistory } from 'react-icons/gr';
import Link from 'next/link';
import { CgProfile } from 'react-icons/cg';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { loadStripe } from '@stripe/stripe-js';

const PackDetails = () => {
	const router = useRouter();
	const [packages, setPackages] = useState();
	const [time, setTime] = useState('');

	useEffect(() => {
		const fetchPackage = async () => {
			const packageResponse = await axios(
				`http://localhost:4000/packages/${router.query.id}`,
				{
					withCredentials: true,
				}
			);
			setPackages(packageResponse.data);
		};
		if (router.query.id) fetchPackage();
	}, [router.query.id]);

	console.log(router.query);
	if (!packages) {
		return <p>Package Not found</p>;
	}

	return (
		<>
			<h1 className={styles.topic}>
				<Link href="/Home">
					<a className={styles.heading}>
						<span className={styles.firstname}>Easy</span>drive
					</a>
				</Link>
			</h1>
			<h1 className={styles.head}>{packages.type}</h1>
			<div className={styles.detailbanner}>
				<h1 className={styles.detailhead}>{packages.name}</h1>
				<p className={styles.detailpara}>{packages.description}</p>
				<div className={styles.imgcontainer}>
					<Image
						src={'/photos/car.svg'}
						alt="Car"
						width={'600px'}
						height={'400px'}
					/>
				</div>
				<span className={styles.timehead}>Select Time</span>
				<div className={styles.inputcont}>
					<input
						type="time"
						className={styles.timeinput}
						onChange={event => {
							setTime(event.currentTarget.value);
						}}
					/>
					<button
						className={styles.detailbtn}
						onClick={async () => {
							if (!time) {
								return toast.error('Please select time');
							}
							const [hour, minute] = time.split(':');
							// console.log(hour);
							// console.log(packages);

							const newPackage = {
								package: packages,
								time: +hour > 12 ? `${+hour - 12}:${minute} PM` : `${time} AM`,
							};

							console.log(newPackage);
							try {
								const session = await axios.post(
									`http://localhost:4000/subscriptions/checkout/${packages._id}`,
									{ time: newPackage.time },

									{
										withCredentials: true,
									}
								);
								const stripe = await loadStripe(
									'pk_test_51KjMORFXaAQEXLLtRmu1590nrXOyRvc1hGa96M8lyBJggZux2gI7g4O6Cc03BNmRJotCDQR59zU94BDm8wWQDCJn00iQ347dbS'
								);
								await stripe.redirectToCheckout({
									sessionId: session.data.id,
								});
								toast.success('Package subscribed successfully');
							} catch (error) {
								console.log(error);
								toast.error(error.response.data.message);
							} finally {
								router.push('/Home');
							}
						}}
					>
						Subscribe
					</button>
				</div>
			</div>

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

				<GrHistory className={styles.icn} />

				<CgProfile className={styles.icn} />
			</div>
		</>
	);
};
export default PackDetails;
