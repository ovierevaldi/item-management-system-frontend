'use client'

import CreateTransactionForm from '@/app/components/main/pos/CreateTransactionForm';
import Modal from '@/app/components/Modal';
import ApiProvider from '@/libs/api-provider';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaCheck } from "react-icons/fa";

export default function ManagePOS() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [detailTransaction, setDetailTransaction] = useState({id: 0, item_data: {}, total_harga: 0, jumlah_item: 0});
  const [transactionId, setTransactionId] = useState('');

  function closeModal(){
    setIsModalOpen(false)
  };

  useEffect(() => {
    const controller = new AbortController();
    const fetchTransactionDetail = async () => {
      try {
        const response = await ApiProvider.getDetailTransaction(transactionId);
        if(response.status === 200){
          setDetailTransaction(response.data);
        }
        else{
          toast.error("Cannot fetch transaction detail")
        }

      } catch (error) {
          console.log(error)
          if(error.response){
              toast.error(error.response.data.message);
          }
          else{
              toast.error("Couldn't Connect to Server")
          }
      }
    };

    if(transactionId)
        fetchTransactionDetail();

    return () => {
      controller.abort(); // Cancel the request on cleanup
    };

  }, [transactionId])

  const onSuccessCreateTransaction = (id) => {
    setTransactionId(id);
    setIsModalOpen(true)
  }

  return (
    <div className='py-8'>
      <div className='flex justify-center'>
        <div className='w-[300px] md:w-[600px] flex flex-col items-center p-4 md:px-4 md:py-8 space-y-4 border shadow-md'>
          <h2 className="text-xl md:text-2xl font-bold mb-4 text-gray-800 ">Create Transaction</h2>

          <CreateTransactionForm handleSuccessCreateTransaction={onSuccessCreateTransaction}/>

          <Modal   
            data={{title: 'Create Transaction'}} 
            isOpen={isModalOpen} 
            onClose={closeModal}>
            
            <div className='space-y-4 min-w-[400px] p-4'>
              <div className='flex justify-center items-center gap-x-4'>
              <p className='text-lg text-center'>Success Create Transaction</p>
              <FaCheck color='green'/>
              </div>
              
              <div>
                <p className='text-lg font-bold'>Details: </p>
                <ul>
                  <li><span>ID: </span>{detailTransaction.id}</li>
                  <li>Item ID ref: {detailTransaction.item_data.id}</li>
                  <li>Jumlah Item: {detailTransaction.jumlah_item}</li>
                  <li>Total Harga: {detailTransaction.total_harga}</li>
                </ul>
              </div>

            </div>

          </Modal>
        </div>
      </div>
    </div>
  )
}
