import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/shopContext'
import Title from '../components/Title';
import { RiDeleteBin2Line } from "react-icons/ri";
import CartTotal from '../components/CartTotal';

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  useEffect(() => {

    const tempData = [];
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItems[items][item]
          })
        }
      }
    }
    setCartData(tempData);
  }, [cartItems])

  return (
    <div className='border-t border-gray-200 pt-14'>

      <div className='text-2xl mb-3'>
        <Title text1={"YOUR"} text2={"CART"} />
      </div>

      <div>
        {
          cartData.map((item, index) => {

            const productData = products.find((product) => product._id === item._id);

            return (
              <div key={index} className='py-4 border-t border-b border-gray-200 text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>

                <div className='flex items-start gap-6'>
                  <img className='w-16 sm:w-20' src={productData.image[0]} alt="" />
                  <div>
                    <p className='text-xs sm:text-lg font-medium'>{productData.name}</p>
                    <div className='flex items-center gap-5 mt-2'>
                      <p> {currency} {productData.price}</p>
                      <p className='px-2 sm:px-3 sm:py-1 border border-gray-200 bg-slate-50'>{item.size}</p>
                    </div>
                  </div>
                </div>

                {/* Quantity increment decrement */}
                <div className='flex items-center justify-between w-30 border border-gray-200'>

                  <button
                    onClick={() =>
                      item.quantity > 1 &&
                      updateQuantity(item._id, item.size, item.quantity - 1)
                    }
                    className='w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 cursor-pointer'
                  >
                    -
                  </button>

                  <span className=' w-10 text-center text-xs sm:text-sm'>
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      updateQuantity(item._id, item.size, item.quantity + 1)
                    }
                    className='w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 cursor-pointer'
                  >
                    +
                  </button>

                </div>

                <RiDeleteBin2Line onClick={() => updateQuantity(item._id, item.size, 0)} className='text-lg mr-4 sm:text-xl cursor-pointer' />
              </div>
            )

          })
        }
      </div>

      <div className='flex justify-end my-20'>
        <div className='w-full sm:w-[450px]'>
          <CartTotal />

          <div className='w-full text-end'>
            <button onClick={() => navigate('/place-order')} className='bg-black text-white text-sm my-8 px-8 py-3 active:bg-gray-800'>PROCEED TO CHECK</button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Cart