import React from 'react'
import Header from '../components/main/Header'
import AuthProtection from '@/libs/AuthProtection'
import Footer from '../components/main/Footer'

export default function MainLayout({children}) {
  return (
    <AuthProtection>
        <main>
            <Header />
            {children}
            <Footer />
        </main>
    </AuthProtection>
  )
}
