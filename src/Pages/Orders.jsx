import React, { useContext } from 'react'
import { ShopContext } from '../context/shopContext'
import Title from '../components/Title';

const Orders = () => {

  const { orders, currency, cancelOrder } = useContext(ShopContext);

  return (
    <div className='border-t border-gray-200 pt-16'>

      <div className='text-2xl'>
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>

      <div>
        {
          orders.length === 0 ? (

            <div className="text-center py-20">
              <h2 className="text-2xl font-semibold">
                No Orders Yet
              </h2>

              <p className="text-gray-500 mt-2">
                Place your first order.
              </p>
            </div>

          ) :
            orders.map((order) => (

              order.items.map((item, index) => (


                <div key={order.id + index} className='py-4 border-t border-b border-gray-200 text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                  <div className='flex items-start gap-6 text-sm'>
                    <img className='w-16 sm:w-20' src={item.image[0]} alt="" />
                    <div>
                      <p className='text-base font-medium'>{item.name}</p>
                      <div className='flex items-center gap-3 mt-2 text-base text-gray-700'>
                        <p className='text-lg'>{currency}{item.price}</p>
                        <p>Quantity: {item.quantity}</p>
                        <p>size: {item.size}</p>
                      </div>
                      <p className='mt-2'>Date: <span className='text-gray-400'>{order.date}</span></p>
                    </div>

                  </div>

                  <div className='md:w-1/2 flex justify-between'>
                    <div className='flex items-center gap-2'>
                      <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                      <p className='text-sm md:text-base'>{order.status}</p>

                    </div>
                    <button className='border border-gray-200 px-4 py-2 font-medium rounded-sm'>Track Order</button>

                    <button
                      onClick={() => cancelOrder(order.id, item._id, item.size)}
                      className='border border-red-100 text-red-500 px-4 py-2 font-medium rounded-sm hover:bg-red-500 hover:text-white transition cursor-pointer'
                    >
                      Cancel Order
                    </button>
                  </div>

                </div>
              ))

            ))
        }
      </div>

    </div>
  )
}

export default Orders