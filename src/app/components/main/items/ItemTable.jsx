'use client'

import ApiProvider from '@/libs/api-provider'
import React, { useEffect, useState } from 'react'

export default function ItemTable() {
    const whitelistColumn = ['url_gambar'];

    const [items, setItems] = useState([]);
    const [isLoadApi, setIsLoadApi] = useState(false);

    useEffect(() => {
        const fetchItemData = async () => {
            setIsLoadApi(true);
            try {
                const response = await ApiProvider.getItems();
                if(response.status === 200){
                    setItems(response.data);
                }
            } catch (error) {
                console.log(error)
            } finally{
                setIsLoadApi(false)
            }
        };

        fetchItemData();
    }, [])
  return (
    isLoadApi ? 
        <p className='text-lg text-center'>
            Load Data...
        </p> 
        
        : 

        <table className='w-full'>
            <thead className='bg-indigo-500'>
                <tr className='text-lg text-white'>
                    {
                        items.slice(0,1).map((value) => {
                            return Object.keys(value).filter(key => !whitelistColumn.includes(key)).map((keys) => 
                                <th 
                                    key={keys}
                                    className='p-2 border border-gray-100'>
                                    {keys}
                                </th>
                            )
                        })
                    }
                    <th className='p-2 border border-gray-100'>Actions</th>
                </tr>
            </thead>
            <tbody>
                {items.map((item_data, index) => 
                    <tr key={index}
                    className='text-center hover:bg-gray-500/20'>
                        {
                            Object.keys(item_data).filter(key => !whitelistColumn.includes(key)).map((key, index) => 
                                <td key={index}
                                className='p-2 border '>
                                    {item_data[key]}
                                </td>
                            )
                        }
                    </tr>
                )}
            </tbody>
        </table>
  )
}
