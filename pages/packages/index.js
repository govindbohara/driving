import styles from '../../components/package/package.module.scss';
import Link from 'next/link';
import { AiOutlineHome } from 'react-icons/ai';
import { BiCategory } from 'react-icons/bi';
import { GrHistory, GrBike } from 'react-icons/gr';
import { AiFillCar } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { useRouter } from 'next/router';
import { useEffect, useState, useMemo } from 'react';
import axios from 'axios';

// const avaiablepacks = [
// 	{ id: Math.random(), name: '7 Day package', price: 'Rs 3500' },
// 	{ id: Math.random(), name: '15 Day package', price: 'Rs 6500' },
// 	{ id: Math.random(), name: '30 Day package', price: 'Rs 12500' },
// 	{ id: Math.random(), name: '45 Day package', price: 'Rs 17000' },
// ];

const Package = () => {
	const [packages, setPackages] = useState([]);
	const [type, setType] = useState('two-wheeler');
	useEffect(() => {
		const fetchPackages = async () => {
			const packages = await axios('http://localhost:4000/packages', {
				withCredentials: true,
			});
			setPackages(packages.data);
			console.log(packages);
		};
		fetchPackages();
	}, []);

	const router = useRouter();
	const filtered = useMemo(() => {
		return packages.filter(_package => _package.type === type);
	}, [packages, type]);

	const packs = filtered.map(pack => {
		return (
			<div key={pack._id} className={styles.cont}>
				<div className={styles.details}>
					<span className={styles.detailname}>{pack.name}</span>
					<span className={styles.detailprice}>Rs.{pack.price}</span>
				</div>

				<button
					className={styles.subbtn}
					onClick={() => {
						router.push(`/packages/${pack._id}`);
					}}
				>
					Expand..
				</button>
			</div>
		);
	});
	console.log(packs);
	return (
		<>
			<h1 className={styles.topic}>
				<Link href="/">
					<a className={styles.heading}>
						<span className={styles.firstname}>Easy</span>drive
					</a>
				</Link>
			</h1>

			<div className={styles.header}>
				<h1 className={styles.head}>Packages</h1>
				<h1 className={styles.head}>{type.split('-').join(' ')}</h1>
				<div className={styles.category}>
					<button className={styles.categoryicn}>
						<GrBike onClick={() => setType('two-wheeler')} size={'30px'} />
					</button>
					<button className={styles.categoryicn}>
						<AiFillCar onClick={() => setType('four-wheeler')} size={'30px'} />
					</button>
				</div>
				<div
					className={styles.packcont}
					style={{ paddingBottom: packs.length > 3 ? '5rem' : '0' }}
				>
					{packs}
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
						router.push('/Categories');
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
export default Package;
