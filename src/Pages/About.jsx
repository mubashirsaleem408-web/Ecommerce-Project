import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

const About = () => {
  return (
    <div>

        <div className='text-2xl text-center pt-8 border-t border-gray-200'>
          <Title text1={'ABOUT'} text2={'US'}/>
        </div>

        <div className='my-10 flex flex-col md:flex-row gap-16'>
          <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />

          <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
               <p>At HypeWear, we believe fashion is more than just clothing—it's a statement of who you are. Our mission is to bring you trendy, high-quality, and comfortable apparel that helps you stand out with confidence.</p>
               <p>Customer satisfaction is at the heart of everything we do. From secure shopping and easy ordering to reliable delivery and dedicated support, we strive to provide an exceptional online shopping experience.</p>
               <b className='text-gray-800'>Our Aim</b>
               <p>Our aim is to inspire confidence through fashion by offering trendy, comfortable, and high-quality clothing at affordable prices while ensuring an excellent shopping experience for every customer</p>
          </div>
        </div>

        <div className='text-2xl py-4'>
          <Title text1={'WHY'} text2={'CHOOSE US'}/>
        </div>

        <div className='flex flex-col md:flex-row text-sm mb-20'>
          <div className='border border-gray-200 px-10 md:px16 py-8 sm:py-20 flex flex-col gap-5'>
            <b className='text-lg'>Quality Assurance:</b>
            <p className='text-gray-600'>We are committed to providing high-quality products that meet our customers' expectations. Every item is carefully selected and inspected to ensure reliability, durability, and customer satisfaction before it reaches your doorstep.</p>
          </div>

          <div className='border border-gray-200 px-10 md:px16 py-8 sm:py-20 flex flex-col gap-5'>
            <b className='text-lg'>Convenience:</b>
            <p className='text-gray-600'>We make online shopping simple and hassle-free by offering an easy-to-use platform, secure payment options, and a smooth checkout process, allowing you to shop anytime and anywhere with confidence.</p>
          </div>

          <div className='border border-gray-200 px-10 md:px16 py-8 sm:py-20 flex flex-col gap-5'>
            <b className='text-lg'>Exceptional Customer Service:</b>
            <p className='text-gray-600'>Our dedicated support team is always ready to assist you with any questions, concerns, or order-related inquiries, ensuring a smooth and satisfying shopping experience from start to finish.</p>
          </div>
        </div>

        <NewsLetterBox />

    </div>
  )
}

export default About