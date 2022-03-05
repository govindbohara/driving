import styles from '../components/main/main.module.scss';
import Link from 'next/link';
const Home = () => {
	return (
		<>
			<div className={styles.header}>
				<h1 className={styles.topic}>
					<Link href="">
						<a className={styles.heading}>
							<span className={styles.firstname}>Easy</span>drive
						</a>
					</Link>
				</h1>
				<h3>Profile</h3>
			</div>
		</>
	);
};
export default Home;
