import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto text-center">
            <p className="text-sm">
                © 2024 Your Company. All rights reserved.
            </p>
            <div className="flex justify-center space-x-4 mt-4">
                <a target='_blank' href="https://www.linkedin.com/in/ovierevaldi/" className="hover:text-gray-400">
                    Contact Us
                </a>
            </div>
        </div>
    </footer>
  )
}
