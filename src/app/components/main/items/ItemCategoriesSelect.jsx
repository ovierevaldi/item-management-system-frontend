'use client'

import ApiProvider from '@/libs/api-provider';
import React, { useEffect, useState } from 'react'

export default function ItemCategoriesSelect() {
    const [itemCategories, setItemCategories] = useState([]);
    const [errorfetchCategoryMsg, seterrorfetchCategoryMsg] = useState('');

    useEffect(() => {
        const getItemCategories = async () =>{
            try {
                const response = await ApiProvider.getCategories();
                if(response.status === 200){
                    setItemCategories(response.data.categories)
                }
                else{
                    seterrorfetchCategoryMsg('Cannot get categories data')
                }
            } catch (error) {
                seterrorfetchCategoryMsg('Cannot get categories data')
            }
        };

        getItemCategories();
    }, [])
  return (
    <div className='flex flex-col'>
            <label className='mb-2 font-bold' htmlFor="kategori">Kategori:</label>
            {
                errorfetchCategoryMsg && <p value={''} className='text-rose-500'>{errorfetchCategoryMsg}</p>
            }
            <select name='kategori'
                id='kategori'
                className={
                    `border rounded-lg px-4 py-2 outline-none focus:border-secondary focus:border-2`
                }>
               {
                itemCategories.map((name) => <option key={name} value={name}>{name}</option>)
               }
            </select>
        </div>
  )
}
