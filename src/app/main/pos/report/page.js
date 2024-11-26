'use client'

import ApiProvider from '@/libs/api-provider'
import currency from '@/libs/currency';
import { reportData } from '@/libs/typedata';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export default function ReportPOS() {
  const [listTransaction, setListTransaction] = useState([]);
  const whitelistColumn = ['item_data'];

  useEffect(() => {
    const getAllTransaction = async () => {
      try {
        const response = await ApiProvider.getAllTransaction();

        if(response.status === 200){
            setItemDataTable(response.data)
        }
        else{
          toast.error("Cannot fetch items")
        }
      } catch (error) {
        if(error.response){
          toast.error(error.response.data.message);
        }
        else{
          toast.error("Couldn't Connect to Server")
        }
      }
    };
    getAllTransaction();
  }, []);

  function setItemDataTable(data){
    const newTransactions = data.map((transaction) => {
      const transactionData = {...reportData};
      transactionData.id = transaction.id;
      transactionData.item_id = transaction.item_data.id;
      transactionData.kategori = transaction.item_data.kategori;
      transactionData.harga = transaction.item_data.harga;
      transactionData.jumlah_item = transaction.jumlah_item;
      transactionData.total_harga = transaction.total_harga;
      transactionData.waktu = currency().covertTanggal(transaction.createdAt);

      return transactionData;
    });
  
    // Update state once
    setListTransaction((prev) => [...prev, ...newTransactions]);

  }

  return (
    <div>
      <p className='text-center font-bold text-2xl py-4'>
        Report POS (Point of Sales)
      </p>

      <div className='p-4 flex justify-center'>
        <div className='max-h-[700px] overflow-auto lg:w-[850px] xl:w-[1024px]'> 
          <table className='mb-4 text-sm md:text-base w-full'>
            <thead className='bg-indigo-500'>
                <tr className='text-lg text-white'>
                    {
                        listTransaction.slice(0,1).map((transaction) => {
                            return Object.keys(transaction).filter(key => !whitelistColumn.includes(key)).map((key) => 
                                <th 
                                    key={key}
                                    className='p-1 md:p-2 border border-gray-100'>
                                    {key}
                                </th>
                            )
                        })
                    }
                    {/* <th 
                      className='p-2 border border-gray-100'>
                      Actions
                    </th> */}
                </tr>
            </thead>
            <tbody>
              {
                listTransaction.map((transaction, index) => 
                  <tr
                    className='text-center hover:bg-secondary/10' 
                    key={index}>
                    {
                      Object.keys(transaction).filter(key => !whitelistColumn.includes(key)).map((key, index) => 
                      <td 
                        key={index}
                        className='p-1 md:p-2 border border-primary'>
                        {transaction[key]}
                      </td>
                      )
                    }
                  </tr>
                )
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
