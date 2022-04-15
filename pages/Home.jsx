import styles from '../components/main/home.module.scss'
import Link from 'next/link'
import { AiOutlineHome } from 'react-icons/ai'
import { BiCategory } from 'react-icons/bi'
import { GrHistory } from 'react-icons/gr'
import { CgProfile } from 'react-icons/cg'
import { useRouter } from 'next/router'
import { GiHamburgerMenu } from 'react-icons/gi'
import { useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import {
  randFutureDate,
  randNumber,
  randPastDate,
  randText,
  randUuid,
} from '@ngneat/falso'
import { Subscriptions } from '../components/subscription/subscriptions'

const DUMMY_SUBSCRIPTIONS = Array.from({ length: 10 })
  .map((_, index) => index)
  .map(() => ({
    _id: randUuid(),
    package: {
      _id: '6235f1851da899d17435e5b8',
      name: '7 days package',
      type: 'four-wheeler',
      price: 5000,
      numOfDays: 7,
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt ex laudantium quae nostrum consectetur. Ex.',
      __v: 0,
    },
    user: {
      _id: '6235f13b1da899d17435e5b1',
      firstName: 'tushar',
      lastName: 'basnet',
      email: 'govindbohara@gmail.com',
      password: '$2a$12$1L5vteii7WO9iQWD.ad.zOkyBjHeCgVLcJstM8JSFemVo8LSMtDtW',
      __v: 0,
    },
    subscribedAt: randPastDate(),
    expiresAt: Math.random() > 0.5 ? randPastDate() : randFutureDate(),
    time: '00:12 AM',
    __v: 0,
  }))

const Home = () => {
  const router = useRouter()
  const [subscriptions, setSubscriptions] = useState(DUMMY_SUBSCRIPTIONS)
  const ongoingSubscriptions = useMemo(
    () =>
      subscriptions.filter(
        subscription => new Date(subscription.expiresAt) > new Date()
      ),
    [subscriptions]
  )
  const expiredSubscriptions = useMemo(
    () =>
      subscriptions.filter(
        subscription => new Date(subscription.expiresAt) < new Date()
      ),
    [subscriptions]
  )
  const [user, setUser] = useState()
  const fetchUserInfo = async () => {
    try {
      const response = await axios.get('http://localhost:4000/users/profile', {
        withCredentials: true,
      })
      console.log(response.data)
      setUser(response.data)
    } catch (err) {
      // toast.error(err.response.data.message);
      console.log(err)
    }
  }

  useEffect(() => {
    const packageName = router.query.packagename
    if (packageName) {
      toast.success('Package Subscribed Successfully')
    }
  }, [router.query.packagename])
  useEffect(() => {
    fetchUserInfo()
  }, [])

  return (
    <>
      <div className={styles.header}>
        <h1 className={styles.topic}>
          <Link href='/Home'>
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
      <div className='p-4'>
        <h1>
          <span>Hello </span>
          <span>{user?.firstName.toUpperCase() ?? ''},</span>
        </h1>
        <div className='mb-4'>
          <h3 className='text-2xl font-bold mb-2'>Ongoing Subscriptions</h3>
          <Subscriptions type={'ongoing'} subscriptions={ongoingSubscriptions} />
        </div>
        <div>
          <h3 className='text-2xl font-bold mb-2'>History</h3>
          <Subscriptions type='expired' subscriptions={expiredSubscriptions} />
        </div>
      </div>
      <nav className='fixed bottom-0 left-0 w-full flex justify-between p-2 bg-indigo-600 text-white'>
        <AiOutlineHome
          className={styles.icn}
          onClick={() => {
            router.push('/Home')
          }}
        />

        <BiCategory
          className={styles.icn}
          onClick={() => {
            router.push('/packages')
          }}
        />

        <GrHistory
          className={styles.icn}
          onClick={() => {
            router.push('/History')
          }}
        />

        <CgProfile
          className={styles.icn}
          onClick={() => {
            router.push('/profile')
          }}
        />
      </nav>
    </>
  )
}
export default Home
