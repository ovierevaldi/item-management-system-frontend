'use client'

import React, { useEffect, useState } from 'react'

export default function BaseInput({name, id, labelName, type, placeholder, value = '', errors}) {
  const [currentValue, setCurrentValue] = useState('');
  
  const onInputValueChange = (e) => {
    setCurrentValue(e.target.value)
  };

  useEffect(() => {
    setCurrentValue(value)
  }, [value])

  return (
    <div className='flex flex-col'>
         <label 
          htmlFor={id}
          className='mb-2 font-semibold'>{labelName}</label>
         <input 
            className='border border-gray-400 rounded-lg px-4 py-2 outline-none focus:border-gray-500'
            onChange={onInputValueChange}
            type={type}
            name={name}
            id={id}
            placeholder={placeholder}
            value={currentValue}>
        </input>

        {errors && 
          errors.map((err, index) => index === 0 ? 
              <p className='text-red-500 text-sm' key={0}>{err}</p> : '' 
          )
        }
    </div>
  )
}
