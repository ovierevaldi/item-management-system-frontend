'use client'

import CreateItemForm from '@/app/components/main/items/CreateItemForm';
import ItemTable from '@/app/components/main/items/ItemTable';
import Modal from '@/app/components/Modal';
import { useState } from 'react';
import { IoMdCreate } from "react-icons/io";

export default function ItemPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const openUpdateModal = () => setIsUpdateModalOpen(true);
  const closeUpdateModal = () => setIsUpdateModalOpen(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const openDeleteModal = () => setIsDeleteModalOpen(true);
  const closeDeleteModal = () => setIsDeleteModalOpen(false);

  function handleSuccessCreateItemModal(){
    closeModal();
  }

  function handleTableActionBtn(type){
    switch (type) {
      case 'Update':
        openUpdateModal();
        break;
      
      case 'Delete':
          openDeleteModal();
          break;

      default:
        break;
    }
  }

  return (
    <div className='space-y-8'>
        <p className='text-2xl font-semibold text-center'>List Item</p>
        
        <div className='flex justify-center'>
          <div className='overflow-auto w-full'>
            <ItemTable handleTableAction={handleTableActionBtn}/>
          </div>
        </div>

        <button 
            onClick={openModal}
            className='px-12 py-8 border-indigo-500/70 border-2 rounded-md flex   items-center justify-center gap-x-2 text-indigo-700 hover:bg-indigo-500/50 duration-100 '>
            <IoMdCreate size={20}/>
            <span className='text-lg font-semibold '>Create Item</span>
        </button>

        <Modal 
          data={{title: 'Create Item'}} 
          isOpen={isModalOpen} 
          onClose={closeModal}>
           <CreateItemForm onSuccessCreateForm={handleSuccessCreateItemModal}/> 
        </Modal>

        <Modal 
          data={{title: 'Update Item'}} 
          isOpen={isUpdateModalOpen} 
          onClose={closeUpdateModal}>
            <>test</>
        </Modal>

        <Modal 
          data={{title: 'Delete Item'}} 
          isOpen={isDeleteModalOpen} 
          onClose={closeDeleteModal}>
            <>test</>
        </Modal>
    </div>
  )
}
