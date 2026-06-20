import React, { useContext, useState } from 'react'
import {assets} from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { CiSearch } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";
import { RiMenuFill } from "react-icons/ri";
import { BsArrowLeft } from "react-icons/bs";
import { ShopContext } from '../context/shopContext';


const Navbar = () => {
  const [visible, setVisible] = useState(false)
  const {setShowSearch, getCartCount} = useContext(ShopContext)
  return (
    <div className='flex items-center justify-between py-5 font-medium'>
        <Link to='/'><img className='w-40' src={assets.logo} alt="" /></Link>

        <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>

          <NavLink to='/' className='flex flex-col items-center gap-1'>
            <p>HOME</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
          </NavLink>

           <NavLink to='/collection' className='flex flex-col items-center gap-1'>
            <p>COLLECTION</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
          </NavLink>

           <NavLink to='/about' className='flex flex-col items-center gap-1'>
            <p>ABOUT</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
          </NavLink>

           <NavLink to='/contact' className='flex flex-col items-center gap-1'>
            <p>CONTACT</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
          </NavLink>
        </ul>
                      {/* for search  */}
        <div className='flex items-center gap-6'>
          
         <CiSearch onClick={()=>setShowSearch(true)} className='text-2xl cursor-pointer' />
                             {/* for profile */}
          <div className='group relative'>
            <Link to='/login'><CiUser className='text-2xl cursor-pointer' /></Link>
                      {/* for dropdown menu */}
            <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4 '>
              <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
                <p className=' cursor-pointer hover:text-black'>My Profile</p>
                <p className=' cursor-pointer hover:text-black'>Orders</p>
                <p className=' cursor-pointer hover:text-black'>Logout</p>
              </div>
            </div>
          </div>
                            {/* for cart */}
          <Link to='/cart' className='relative'>
          <CiShoppingCart className='text-2xl cursor-pointer' />
          <p className='absolute right-[-4px] bottom-[-2px] w-4 text-center leading-4 text-[8px] bg-black text-white aspect-square rounded-full'>{getCartCount()}</p>
          </Link>
          <RiMenuFill onClick={()=>setVisible(true)}  className='text-2xl cursor-pointer sm:hidden' />
        </div>

                    {/* sidebar menu for small screen */}

        <div className={`fixed top-0 right-0 bottom-0 z-50 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
          <div className='flex flex-col text-gray-600'>
            <div onClick={()=>setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
             <BsArrowLeft className='text-xl'  />
              <p>Back</p>
            </div>
            
              <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border border-gray-200' to='/'>HOME</NavLink>
              <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border border-gray-200' to='/collection'>COLLECTION</NavLink>
              <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border border-gray-200' to='/about'>ABOUT</NavLink>
              <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border border-gray-200' to='/contact'>CONTACT</NavLink>
            
          </div>
        </div>
    </div>
  )
}

export default Navbar