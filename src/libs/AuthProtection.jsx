'use client'

import { useEffect } from 'react'
import { useAuth } from './AuthProvider'
import { useRouter } from 'next/navigation';


export default function AuthProtection({children}) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    if(!isAuthenticated()){
      router.push('/auth')
    }
  })

  return (children)
}
