import '../styles/global.css'
import { ToastContainer } from 'react-toastify'
import '@stripe/stripe-js'
import 'react-toastify/dist/ReactToastify.css'

function MyApp({ Component, pageProps }) {
  return (
    <div style={{ overflowY: 'scroll' }}>
      <ToastContainer position='top-center' />
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
