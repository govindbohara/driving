import classNames from 'classnames'
import { format } from 'date-fns'

export const Subscriptions = ({ subscriptions, type }) => {
  const subscriptionClass = type =>
    classNames(`p-4 rounded-md shadow-sm space-y-2`, {
      'border border-green-300': type === 'ongoing',
      'border border-red-300': type === 'expired',
    })
  return (
    <div className='space-y-4'>
      {subscriptions.map(subscription => (
        <div key={subscription._id} className={subscriptionClass(type)}>
          <h3 className='font-bold text-lg'>{subscription.package.name}</h3>
          <p>{subscription.package.description}</p>
          <p>Total Price: {subscription.package.price}</p>
          <div className='space-y-2'>
            <p className='font-medium'>
              Subscribed on : {format(new Date(subscription.subscribedAt), 'PPP')}
            </p>
            <p className='font-medium'>
              {type === 'ongoing' ? 'Expires At' : 'Expired At'} :{' '}
              {format(new Date(subscription.expiresAt), 'PPP')}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
