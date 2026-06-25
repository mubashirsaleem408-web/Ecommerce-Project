import React from 'react'
import { MdOutlineStar } from "react-icons/md";

const ReviewCard = ({ review }) => {
  return (
    <div className='bg-white border border-gray-200 rounded-xl p-4 sm:p-5 shadow-sm hover:shadow-lg transition-all duration-300'>

      <div className='flex gap-1'>
        {[...Array(5)].map((_, index) => (
          <MdOutlineStar
            key={index}
            className={
              index < review.rating
                ? 'text-yellow-500'
                : 'text-gray-300'
            }
          />
        ))}
      </div>

      <h3 className='font-semibold text-base sm:text-lg mt-3'>
        {review.title}
      </h3>

      <p className='text-gray-500 mt-3 text-sm leading-relaxed'>
        {review.comment}
      </p>

      <div className='flex items-center gap-3 mt-5'>
        <img
          src={review.image}
          alt={review.name}
          className='w-10 h-10 rounded-full'
        />

        <div>
          <p className='font-medium text-black'>
            {review.name}
          </p>

          <p className='text-xs text-gray-400'>
            {review.date}
          </p>
        </div>
      </div>

    </div>
  )
}

export default ReviewCard