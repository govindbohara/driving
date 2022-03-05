import '../styles/globals.scss';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }) {
	return (
		<div>
			<ToastContainer position="top-center" />
			<Component {...pageProps} />
		</div>
	);
}

export default MyApp;
