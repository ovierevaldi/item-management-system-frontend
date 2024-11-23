'use client'

import { useAuth } from "@/libs/AuthProvider";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { FaUserCircle } from "react-icons/fa";
import { FaPowerOff } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import logo from '@/../public/logo.svg'

export default function Header() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const {logOut, getUserInfo} = useAuth();
  const [username, setUsername] = useState('');
  const router = useRouter()
 
  useEffect(() => {
      const userSession = getUserInfo();
      if(userSession){
        setUsername(userSession.user.username)
      }
  },[])

  function handleUserMenu(){
    setIsUserMenuOpen(!isUserMenuOpen);
  }
  
  function logoutUser(){
    logOut()
    router.push('/auth');
  }

  return (
    <header className='flex justify-between items-center bg-primary p-4 bg-indigo-600'>
        <Link href={'/'}>
          <div className='flex items-center gap-x-2'>
            <Image src={logo} priority={true} alt="placeholder logo" className="w-32"/>
          </div>
        </Link>
        <p className='font-bold text-2xl text-white'> Item Management System </p>
        <ul className='flex gap-x-4 relative'>
          <li>
            <button onClick={handleUserMenu} className='flex items-center gap-x-4 text-white'>
              <span>{username}</span>
              <div className="flex items-center gap-x-2">
                <IconContext.Provider 
                  value={{size: '1.5em'}}> 
                  <FaUserCircle />
                </IconContext.Provider>
                <IoMdArrowDropdown />
              </div>
            </button>
            <div className={`bg-white absolute border border-indigo-600  px-4 py-2 mt-2 rounded-lg ${isUserMenuOpen ? 'block ' : 'hidden'}`}>
              <ul>
                <li>
                  <button onClick={logoutUser} className='flex items-center justify-around gap-x-2 hover:underline'>
                    <span>Logout</span>
                    <IconContext.Provider value={{size: '1em'}}>
                      <FaPowerOff />
                    </IconContext.Provider>
                  </button>
                </li>
              </ul>
            </div>
          </li>
        </ul>
    </header>  
  )
}
