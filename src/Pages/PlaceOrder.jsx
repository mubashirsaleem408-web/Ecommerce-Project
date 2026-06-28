import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/shopContext'
import { toast } from 'react-toastify'


const PlaceOrder = () => {

  const [method, setMethod] = useState('cod');
  // Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    phone: ''
  });

  const {
    navigate,
    cartItems,
    setCartItems,
    products,
    delivery_fee,
    getCartAmount,
    orders,
    setOrders
  } = useContext(ShopContext);

const handleChange = (e) => {
  const {name , value} = e.target;

  setFormData((prev) =>({
    ...prev,
    [name]: value
  }));
};

const validateForm = () => {
  for (const key in formData) {

    if(formData[key].trim() === '') {
      toast.error('please fill all the fields');
      return false;
    }
  }
  return true;
};

const handlePlaceOrder = () => {

  if (!validateForm()) return;

  let orderedProducts = [];

  for(const itemId in cartItems) {
    const productInfo = products.find(
      (product) => product._id ===itemId
    );

    for (const size in cartItems[itemId]) {
      if (cartItems[itemId][size] > 0) {

        orderedProducts.push({
          ...productInfo,
          size,
          quantity: cartItems[itemId][size]
        });
      }
    }
  }

  // -------------  Order Data(Make complete order) --------------------
  const orderData = {
    id: Date.now(),
    items: orderedProducts,
    address: formData,
    paymentMethod: method,
    amount: getCartAmount() + delivery_fee,
    status: "Order Placed",
    date: new Date().toLocaleDateString()
  };

  setOrders([...orders, orderData]);

  setCartItems({});

  navigate('/orders');

};


  return (
    <div className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t border-gray-200'>
      {/*--------------- Left Side -------------------*/}
      <div className='flex flex-col gap-4 w-full sm:w-[480px]'>

        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>

        <div className='flex gap-3'>
          {/*------------- 1st input -------------*/}
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
           type="text" 
           placeholder='First name'
           name="firstName"
           value={formData.firstName}
           onChange={handleChange} 
           />
           {/*------------- 2nd input -------------*/}

          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
           type="text"
          placeholder='Last name'
          name="lastName"
          value={formData.lastName}
          onChange={handleChange} 
          />
        </div>
        {/*------------- 3rd input -------------*/}
        <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
         type="email"
          placeholder='Email address' 
          name="email"
          value={formData.email}
          onChange={handleChange} 
          />

          {/*------------- 4rth input -------------*/}
        <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
         type="text"
         placeholder='Street name'
         name="street"
         value={formData.street}
         onChange={handleChange}
         />
        
        <div className='flex gap-3'>

         {/*------------- 5th input -------------*/}
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
          type="text"
           placeholder='City'
           name="city"
          value={formData.city}
          onChange={handleChange} />


         {/*------------- 6th input -------------*/}
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' 
          type="text" 
          placeholder='State' 
          name="state"
          value={formData.state}
          onChange={handleChange}/>
        </div>

        <div className='flex gap-3'>
         {/*------------- 7th input -------------*/}

          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' 
          type="number" 
          placeholder='Postal code' 
          name="postalCode"
          value={formData.postalCode}
          onChange={handleChange}/>

         {/*------------- 8th input -------------*/}
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' 
          type="text" 
          placeholder='Country' 
          name="country"
          value={formData.country}
          onChange={handleChange}/>
        </div>

         {/*------------- 9th input -------------*/}

        <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' 
        type="number" 
        placeholder='Phone no' 
        name="phone"
        value={formData.phone}
        onChange={handleChange}/>

      </div>
      {/*------------------ Right Side ---------------------*/}
           <div className='mt-8'>

            <div className='mt-8 min-w-80'>
              <CartTotal />
            </div>

            <div className='mt-12'>
              <Title text1={'PAYMENT'} text2={'METHOD'}/>
              {/*----------------------- Payment method selection ---------------------*/}
              <div className='flex flex-col gap-3 lg:flex-row'>

                <div onClick={()=>setMethod('stripe')} className='flex items-center gap-3 border border-gray-200 p-2 px-3 cursor-pointer'>
                  <p className={`min-w-3.5 h-3.5 border border-gray-300 rounded-full ${method === 'stripe' ? 'bg-green-500' : ''}`}></p>
                  <img className='h-10 mx-4' src={assets.jazzcash_logo} alt="" />
                </div>

                <div onClick={()=>setMethod('razorpay')} className='flex items-center gap-3 border border-gray-200 p-2 px-3 cursor-pointer'>
                  <p className={`min-w-3.5 h-3.5 border border-gray-300 rounded-full ${method === 'razorpay' ? 'bg-green-500' : ''}`}></p>
                  <img className='h-10 mx-4' src={assets.easypaisa_logo} alt="" />
                </div>
                
                <div onClick={()=>setMethod('cod')} className='flex items-center gap-3 border border-gray-200 p-2 px-3 cursor-pointer'>
                  <p className={`min-w-3.5 h-3.5 border border-gray-300 rounded-full ${method === 'cod' ? 'bg-green-500' : ''}`}></p>
                  <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
                </div>

              </div>

              <div className='w-full text-end mt-8'>
                  <button onClick={handlePlaceOrder} className='bg-black text-white px-16 py-3 text-sm'>PLACE ORDER</button>
              </div>

            </div>

           </div>

    </div>
  )
}

export default PlaceOrder