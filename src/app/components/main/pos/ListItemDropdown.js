'use client'

import React from 'react'

export default function ListItemDropdown({listItem, isInputFocus, handleOnClick}) {
  return (
    <ul 
        className={`focus:block absolute bg-gray-300 rounded-lg w-full cursor-pointer px-5 max-h-72 overflow-y-auto space-y-1 py-2
        ${isInputFocus ? 'block' : 'hidden'}`}>
        {
            listItem.map((item, index) =>
            <li key={index} 
                onClick={() => handleOnClick(item.id)} 
                className='hover:bg-gray-300/80 font-semibold hover:text-lg'>
                {item.nama}
            </li>
            )
        }
    </ul>
  )
}
