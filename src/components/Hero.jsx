import React, { useState, useEffect } from 'react'
import { assets } from '../assets/assets'


const heroImages = [
  assets.hero_img1,
  assets.hero_img2,
  assets.hero_img3,
  assets.hero_img4,
]

function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length)
    }, 3000) 

    return () => clearInterval(interval)
  }, [])

  return (
    <div className='relative w-full h-[400px] sm:h-[500px] border border-gray-400 overflow-hidden'>
      {/* Background image slider */}
      {heroImages.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`hero-${index}`}
          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}

      {/* Dark overlay for text readability */}
      <div className='absolute top-0 left-0 w-full h-full bg-black/30'></div>

      {/* Content overlay */}
      <div className='relative z-10 flex items-center justify-center sm:justify-start h-full px-6 sm:px-16'>
        <div className='text-white'>
          <div className='flex items-center gap-2'>
            <p className='w-8 md:w-11 h-[2px] bg-white'></p>
            <p className='font-medium text-sm md:text-base'>OUR BEST SELLER</p>
          </div>
          <h1 className='prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed'>
            Latest Arrivals
          </h1>
          <div className='flex items-center gap-2'>
            <p className='font-semibold text-sm md-text-base'>SHOP NOW</p>
            <p className='w-8 md:w-11 h-[1px] bg-white'></p>
          </div>
        </div>
      </div>

      {/* Dots indicator */}
      <div className='absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10'>
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex ? 'bg-white w-4' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default Hero