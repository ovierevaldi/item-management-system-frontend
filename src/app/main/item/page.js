'use client'

import CreateItemForm from '@/app/components/main/items/CreateItemForm';
import ItemTable from '@/app/components/main/items/ItemTable';
import UpdateItemForm from '@/app/components/main/items/UpdateItemForm';
import Modal from '@/app/components/Modal';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { IoMdCreate } from "react-icons/io";

export default function ItemPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const openUpdateModal = (id) => {
    return setIsUpdateModalOpen(true)
  };
  const closeUpdateModal = () => {
    return setIsUpdateModalOpen(false)
  };

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const openDeleteModal = (id) => {
    return setIsDeleteModalOpen(true)
  };
  const closeDeleteModal = () => {
    return setIsDeleteModalOpen(false)
  };

  function handleSuccessCreateItemModal(){
    closeModal();
  }

  function handleSuccessUpdateItemModal(){
    closeUpdateModal();
  }

  function handleTableActionBtn(id, type){
    setSelectedActionItemId(id);

    switch (type) {
      case 'Update':
        openUpdateModal(id);
        break;
      
      case 'Delete':
          openDeleteModal(id);
          break;

      default:
        break;
    }
  }

  const [selectedActionItemId, setSelectedActionItemId] = useState(null)

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
            <UpdateItemForm id={selectedActionItemId} onSuccessUpdateItem={handleSuccessUpdateItemModal}
            />
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
