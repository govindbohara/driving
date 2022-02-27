import Image from 'next/image';
import Link from 'next/link';
import styles from './main.module.scss';
const Main = () => {
	return (
		<div className={styles.main}>
			<div className={styles.title}>
				<h1 className={styles.topic}>
					<span className={styles.firstname}>Easy</span>drive
				</h1>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo, nisi?
				</p>
			</div>
			<div className={styles.image}>
				<Image src={'/photos/car.svg'} alt="Car" width={'600px'} height={'400px'} />
			</div>
			<Link href="/Signup" passHref>
				<button className={styles.btn}>GET STARTED</button>
			</Link>
			<div className={styles.bottom}>
				<p>
					Already have an account?
					<Link href="/Login">
						<a className={styles.log}>Login</a>
					</Link>
				</p>
			</div>
		</div>
	);
};
export default Main;
