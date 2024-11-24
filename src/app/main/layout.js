import React from 'react'
import Header from '../components/main/Header'
import AuthProtection from '@/libs/AuthProtection'
import Footer from '../components/main/Footer'
import { IoArrowBack } from "react-icons/io5";
import NavigationButtons from '../components/main/NavigationButtons';

export default function MainLayout({children}) {
  return (
    <AuthProtection>
        <main>
            <Header />
            <div className='flex'>
              <div className='w-full max-w-64 bg-gray-200 p-4'>
               <div className='flex justify-center items-center mb-4'>
                <p className='font-semibold text-lg text-center flex-grow'>Navigation</p>
               </div>
               <NavigationButtons/>
              <div>
                <button className='hover:bg-indigo-500 hover:text-white rounded-full p-1 text-ellipsis float-end'>
                  <IoArrowBack size={22} className=''/>
                </button>
              </div>
                  
              </div>
              <div className='flex-grow p-4'>
                {children}
              </div>
            </div>
            {/* <Footer /> */}
        </main>
    </AuthProtection>
  )
}
