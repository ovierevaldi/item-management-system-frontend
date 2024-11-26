'use client'

import ApiProvider from '@/libs/api-provider'
import React, { useEffect, useState } from 'react';
import { IoIosRefresh } from "react-icons/io";
import ActionButton from './ActionButton';

export default function ItemTable({handleTableAction, refetchApi}) {
    const whitelistColumn = ['url_gambar'];

    const [items, setItems] = useState([]);
    const [isLoadApi, setIsLoadApi] = useState(false);

    function handleActionBtn(type, id){
        handleTableAction(type, id)
    }

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
    }, [refetchApi])
  return (
    isLoadApi ? 
        <p className='text-lg text-center'>
            Load Data...
        </p> 
        
        : 

        <table className='mb-4 text-sm md:text-base xl:min-w-[850px]'>
            <thead className='bg-indigo-500'>
                <tr className='text-lg text-white'>
                    {
                        items.slice(0,1).map((value) => {
                            return Object.keys(value).filter(key => !whitelistColumn.includes(key)).map((keys) => 
                                <th 
                                    key={keys}
                                    className='md:p-2 border border-gray-100'>
                                    {keys}
                                </th>
                            )
                        })
                    }
                    <th className='md:p-2 border border-gray-100'>Actions</th>
                </tr>
            </thead>
            <tbody>
                {items.map((item_data, index) => 
                    <tr key={index}
                        className='text-center '>
                        {
                            Object.keys(item_data).filter(key => !whitelistColumn.includes(key)).map((key, index) => 
                                <td key={index}
                                    className='md:md:p-2 border '>
                                    <span>{item_data[key]}</span>
                                </td>
                            )
                        }
                        <td className='md:p-2 border flex flex-col md:flex-row gap-y-2 justify-center items-center gap-x-8'>
                            <ActionButton 
                                type={'Update'} 
                                id={item_data.id}
                                handleActionBtnClick={handleActionBtn}>
                                Update
                            </ActionButton>
                            <ActionButton
                                id={item_data.id}
                                handleActionBtnClick={handleActionBtn}
                                type={'Delete'}
                                >Delete
                            </ActionButton>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
  )
}
