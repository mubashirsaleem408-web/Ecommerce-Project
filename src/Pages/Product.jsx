import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/shopContext'
import { products } from '../assets/assets'
import { MdOutlineStar } from "react-icons/md";
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {
  const { productId } = useParams()
  const { products, currency , addToCart } = useContext(ShopContext)
  const [productData, setProductData] = useState(false)
  const [image, setImage] = useState('')
  const [size, setZize] = useState('')

  const fetchProductData = async () => {

    products.map((item) => {
      if (item._id === productId) {
        setProductData(item)
        setImage(item.image[0])
        return null;
      }
    })

  }

  useEffect(() => {
    fetchProductData()
  }, [productId])


  return productData ? (
    <div className='border-t-2 border-gray-200 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/*------------ product data -----------*/}
      <div className='flex gap-12 sm-gap-12 flex-col sm:flex-row'>
        {/* ----------product Images ---------*/}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>

            {
              productData.image.map((item, index) => (
                <img onClick={() => setImage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 active:scale-90 transition-transform duration-100 flex-shrink-0 cursor-pointer' alt="" />
              ))
            }
          </div>
          <div className='w-full sm:w-[80%]'>
            <img className='w-full h-auto' src={image} alt="" />
          </div>
        </div>

        {/*--------- product info ------------*/}
        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>
            {productData.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
            <MdOutlineStar className='text-sm text-yellow-600' />
            <MdOutlineStar className='text-sm text-yellow-600' />
            <MdOutlineStar className='text-sm text-yellow-600' />
            <MdOutlineStar className='text-sm text-yellow-600' />
            <MdOutlineStar className='text-sm text-yellow-200' />
            <p className='pl-2'>(122)</p>
          </div>
          <p className='mt-5 text-2xl font-medium'>{currency} {productData.price}</p>
          <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>

          <div className='flex flex-col gap-4 my-8'>
            <p>Select Size</p>
            <div className='flex gap-2'>
              {productData.sizes.map((item, index) => (
                <button onClick={()=>setZize(item)} className={`border border-gray-100 py-2 px-4 bg-gray-200 active:scale-75 transition-transform duration-200  cursor-pointer ${item === size ? 'border-orange-500' : ''}`} key={index}>{item}</button>
              ))}
            </div>
          </div>
          {/*----------- ADD TO CART BUTTON --------------*/}
             <button onClick={()=>addToCart(productData._id,size)} className='bg-gray-800 text-white py-3 px-8 text-sm active:bg-gray-700 cursor-pointer'>ADD TO CART</button>
             <hr className='mt-8 sm:w-4/5'/>

             <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
              <p>100% Orignal product.</p>
              <p>Cash on delivery is available.</p>
              <p>Easy return and excange policy within 7 days.</p>
             </div>
         </div>
     </div>

     {/* ----------- Description & Review section ------------ */}
      <div className='mt-20'>
        <div className='flex'>
          <b className='border border-gray-200 px-5 py-3 text-sm'>Description</b>
          <p className='border border-gray-200 px-5 py-3 text-sm'>Review (122)</p>
        </div>

        <div className='flex flex-col gap-4 border border-gray-200 px-6 py-6 text-sm text-gray-500'>
             <p>An e-commerce website is an online platform that allows businesses to display and sell products or services over the internet. Customers can browse products, view details, add items to a cart, make secure payments, and place orders from anywhere.</p>
             <p>One of the most important aspects of an e-commerce website is its secure payment system. Modern e-commerce platforms integrate various payment methods, such as credit cards, debit cards, digital wallets, and cash-on-delivery options.</p>
        </div>
      </div>
         {/*--------------- display related products ----------------*/}
           <RelatedProducts category={productData.category} subCategory={productData.subCategory}/>

    </div>
  ) : <div className='opacity-0'></div>
}

export default Product