'use client'

import React, { useState } from 'react'
import Header from '../components/main/Header'
import AuthProtection from '@/libs/AuthProtection'
import Footer from '../components/main/Footer'
import { IoArrowBack } from "react-icons/io5";
import NavigationButtons from '../components/main/NavigationButtons';
import { FaBars } from "react-icons/fa6";

export default function MainLayout({children}) {
  const [isNavHide, setisNavHide] = useState(false);

  function toggleNav(){
    setisNavHide(!isNavHide)
  }
  
  return (
    <AuthProtection>
        <main>
            <Header />
            <div className='relative'>

              <div className={` bg-gray-200 p-2 md:p-4 xl:min-w-[240px] ${isNavHide ? 'hidden' : 'absolute z-10 h-screen'}`}>
                <div className='flex justify-center items-center mb-4'>
                  <p className='font-semibold text-lg text-center flex-grow'>Navigation</p>
                </div>
                <NavigationButtons/>
                <div>
                  <button className='hover:bg-indigo-500 hover:text-white rounded-full p-1 text-ellipsis float-end'>
                    <IoArrowBack onClick={toggleNav} size={22} className=''/>
                  </button>
                </div>
              </div>

              {
                isNavHide && 
                <button className='bg-indigo-500 absolute p-2 top-1 rounded-e-md' onClick={toggleNav}>
                  <FaBars color='white' size={22}/>
                </button>
              }

              {children}
            </div>
            {/* <Footer /> */}
        </main>
    </AuthProtection>
  )
}
