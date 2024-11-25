import { allowedImageExtentions } from '@/configs/config'
import React from 'react'

export default function InputImage({errors}) {
  return (
    <div className='flex flex-col'>
        <label className='mb-2 font-bold' htmlFor="kategori">Gambar:</label>
            <input 
                name='gambar'
                id='gambar'
                type='file' 
                className={
                    `border rounded-lg px-4 py-2 outline-none focus:border-secondary focus:border-2`
                }/>

                {errors && 
                    errors.map((err, index) => index === 0 ? 
                        <span  key={0}
                            className='text-red-500 text-sm'> 
                            Allowed Extetions: <br></br>
                            {allowedImageExtentions.join('\n')}
                        </span>
                     : '' )
                }
      </div>
  )
}
