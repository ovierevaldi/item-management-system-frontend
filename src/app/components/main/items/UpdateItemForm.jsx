'use client'

import React, { useEffect, useState } from 'react'
import BaseInput from '../../BaseInput'
import { typeList } from '@/configs/config'
import ItemCategoriesSelect from './ItemCategoriesSelect'
import InputImage from './InputImage'
import ApiProvider from '@/libs/api-provider'
import toast from 'react-hot-toast'
import zodValidation from '@/libs/zod-validation'

export default function UpdateItemForm({id, onSuccessUpdateItem}) {
    const errorGettingItem = 
    <div>
        <p className='text-rose-500 text-lg p-4 font-semibold'>Cannot get item detail</p>
    </div>
    const [isUpdatingItem, setIsUpdatingItem] = useState(false);
    const [itemDetail, setItemDetail] = useState({});
    const { parseItem } = zodValidation();
    const [errorFormValidation, seterrorFormValidation] = useState({
      nama: [],
      stok: [],
      harga: [],
      gambar: []
    });
    const [errorCreateItemApi, setErrorCreateItemApi] = useState('');

    useEffect(() => {
      const getItemDetail = async (item_id) => {
        const response = await ApiProvider.getItem(item_id);

        if(response.status === 200){
          setItemDetail(response.data)
        };
      };

      getItemDetail(id)
    }, [id]);

    async function onFormSubmit(e){
      e.preventDefault();
        
      const formData = new FormData(e.target);
      const formValues = Object.fromEntries(formData.entries());

      // Convert some string form data values
      formValues.stok = parseInt(formData.get('stok'));
      formValues.harga = parseInt(formData.get('harga'));

      // Check images
      const itemImage = formData.get('gambar');
      formValues.gambar = {
          nama: itemImage.name,
          type: itemImage.type
      };
      
      const validationResult = parseItem(formValues);

        if(!validationResult.success){
            seterrorFormValidation(validationResult.error.flatten().fieldErrors)
            return;
        };

        // remove all images property
        const itemData = validationResult.data;
        itemData.url_gambar = validationResult.data.gambar.nama;
        delete itemData.gambar;

        clearError();

        const response = await postUpdateItem(itemData);

        if(response){
            // Save user data into session storage
            toast.success('Update item success');
            // sesStorageProvider().saveUserData(response.data);
            onSuccessUpdateItem();
            // router.push('/');
        }
    }

    const postUpdateItem = async (itemData) => {
      try {
          setIsUpdatingItem(true);
          return await ApiProvider.updateItem(id, itemData);
      } catch (error) {
          console.log(error)
          if(error.response.data.message){
              setErrorCreateItemApi(error.response.data.message);
          }
          else{
              setErrorCreateItemApi("Internal Server Error")
          }
          return null;
      } finally {
        setIsUpdatingItem(false);
      }
  }

  const clearError = () => {
      seterrorFormValidation({})
      setErrorCreateItemApi('');
  }

  return (
    id ? 
    <form 
      onSubmit={onFormSubmit}
      className='p-4 space-y-4 min-w-[350px]' 
    >   
        {
          errorCreateItemApi && <p className='text-red-500 text-center font-semibold text-lg'>{errorCreateItemApi}</p>
        }

        <p className=''>Id: <span className='font-semibold'>{id}</span></p>
        <BaseInput 
          name={'nama'}
          id={'nama'}
          labelName={'Nama'}
          type={typeList.text}
          value={itemDetail.nama}
          errors={errorFormValidation.nama}
        />

        <BaseInput
          name={'stok'}
          id={'stok'}
          labelName={'Stok'}
          type={typeList.number}
          value={itemDetail.stok}
          errors={errorFormValidation.stok}
        />

        <BaseInput
          name={'harga'}
          id={'harga'}
          labelName={'Harga'}
          type={typeList.number}
          value={itemDetail.harga}
          errors={errorFormValidation.harga}
        />

        <ItemCategoriesSelect />

        <InputImage errors={errorFormValidation.gambar} />

        <div className='flex flex-col'>
            <button
                disabled={isUpdatingItem}
                type='submit'
                className='bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600
                disabled:bg-indigo-300'>
                Submit
            </button>
        </div>
        
    </form> 
    : errorGettingItem
  )
}
