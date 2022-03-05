import styles from '../components/package/package.module.scss';
import Link from 'next/link';
import { BiHomeAlt } from 'react-icons/bi';
const avaiablepacks = [
	{ id: Math.random(), name: '7 Day package', price: 'Rs 3500' },
	{ id: Math.random(), name: '15 Day package', price: 'Rs 6500' },
	{ id: Math.random(), name: '30 Day package', price: 'Rs 12500' },
	{ id: Math.random(), name: '45 Day package', price: 'Rs 17000' },
];

const Package = () => {
	const packs = avaiablepacks.map(pack => {
		return (
			<div key={pack.id} className={styles.cont}>
				<div className={styles.details}>
					<span className={styles.detailname}>{pack.name}</span>
					<span className={styles.detailprice}>{pack.price}</span>
				</div>

				<button className={styles.subbtn}>SUBSCRIBE</button>
			</div>
		);
	});
	console.log(packs);
	return (
		<>
			<h1 className={styles.topic}>
				<Link href="./">
					<a className={styles.heading}>
						<span className={styles.firstname}>Easy</span>drive
					</a>
				</Link>
			</h1>

			<div className={styles.header}>
				<h1 className={styles.head}>Packages</h1>
				<h1 className={styles.head}>Two wheelers</h1>
				<div>{packs}</div>
			</div>
			<div className={styles.footer}>
				
			</div>
		</>
	);
};
export default Package;
