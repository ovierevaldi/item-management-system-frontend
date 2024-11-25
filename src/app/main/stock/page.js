'use client'
import ApiProvider from '@/libs/api-provider'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

export default function Stock() {
  const [listReportStock, setListReportStock] = useState([]);
  const whitelistColumn = [];

  useEffect(() => {
    const getStockReport = async () => {
      try {
        const response = await ApiProvider.getItemStock();

        if(response.status === 200){
          setListReportStock(response.data);
          console.log(response.data)
        }
        else{
          toast.error("Cannot fetch items")
          }
        } 

      catch (error) {
        if(error.response){
          toast.error(error.response.data.message);
        }
        else{
          toast.error("Couldn't Connect to Server")
        }
      }
    };

    getStockReport();
  }, [])

  return (
    <div className='p-4'>
      <p className='text-center font-bold text-2xl mb-8'>Stock Report</p>
      <div className='max-h-[750px] overflow-y-auto'>
        <table className='mb-4 min-w-[750px]'>
          <thead className='bg-indigo-500'>
              <tr className='text-lg text-white'>
                  {
                      listReportStock.slice(0,1).map((report_stock) => {
                          return Object.keys(report_stock).filter(key => !whitelistColumn.includes(key)).map((key) => 
                              <th 
                                  key={key}
                                  className='p-2 border border-gray-100'>
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
              listReportStock.map((report_stock, index) => 
                <tr
                  className='text-center hover:bg-secondary/10' 
                  key={index}>
                  {
                    Object.keys(report_stock).filter(key => !whitelistColumn.includes(key)).map((key, index) => 
                      <td 
                        key={index}
                        className='p-2 border border-primary'>
                        {key !== 'onStock' ? report_stock[key] : 
                          <span 
                            className={`${report_stock[key] === true ? 'bg-green-500/80': 'bg-rose-500/80'} text-white p-2`}>
                            {report_stock[key] === true ? 'Available' : 'Empty'}
                          </span>}
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
  )
}
