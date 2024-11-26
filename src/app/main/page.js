'use client'

import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

export default function MainPage() {
    const router = useRouter();

    useEffect(() => {
      router.push('/main/item');
    }, [])
  
    return (
        <div>
        
        </div>
    )
}
