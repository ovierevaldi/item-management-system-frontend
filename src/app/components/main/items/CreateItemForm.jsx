'use client'

import { allowedImageExtentions } from '@/configs/config';
import ApiProvider from '@/libs/api-provider';
import zodValidation from '@/libs/zod-validation';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

export default function CreateItemForm({onSuccessCreateForm}) {
    const [errorFormValidation, seterrorFormValidation] = useState({});
    const [itemCategories, setItemCategories] = useState([]);
    const [errorfetchCategoryMsg, seterrorfetchCategoryMsg] = useState('');
    const { parseItem } = zodValidation();
    const [errorCreateItemApi, setErrorCreateItemApi] = useState('');
    const [isCreatingItem, setIsCreatingItem] = useState(false);

    async function handleCreateItemForm(e){
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
            console.log(validationResult.error.flatten().fieldErrors)
            seterrorFormValidation(validationResult.error.flatten().fieldErrors)
            return;
        };

        // remove all images property
        const itemData = validationResult.data;
        itemData.url_gambar = validationResult.data.gambar.nama;
        delete itemData.gambar;
        clearError();

        const response = await postCreateItem(itemData);

        if(response){
            // Save user data into session storage
            toast.success('Create item success');
            onSuccessCreateForm();
            // sesStorageProvider().saveUserData(response.data);
            
            // router.push('/');
        }
    };

    const postCreateItem = async (itemData) => {
        try {
            setIsCreatingItem(true);
            return await ApiProvider.createItem(itemData);
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
            setIsCreatingItem(false);
        }
    }

    const clearError = () => {
        seterrorFormValidation({})
        setErrorCreateItemApi('');
    }

    useEffect(() => {
        const getItemCategories = async () =>{
            try {
                const response = await ApiProvider.getCategories();
                console.log(response)
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
    <form 
        onSubmit={handleCreateItemForm} 
        method='post' 
        className='space-y-8 min-w-[400px]'>
        
        {
          errorCreateItemApi && <p className='text-red-500 text-center font-semibold text-lg'>{errorCreateItemApi}</p>
        }

        <div className='flex flex-col'>
            <label className='mb-2 font-bold' htmlFor="nama">
                Nama Barang:*
            </label>
            <input 
                name='nama'
                id='nama'
                type='text'
                placeholder=''
                autoComplete='on'
                className={
                    `border rounded-lg px-4 py-2 outline-none focus:border-secondary focus:border-2 ${errorFormValidation.name ? 'border-red-500' : ''}`
                } />
                {errorFormValidation.nama && 
                    errorFormValidation.nama.map((err, index) => index === 0 ? 
                        <p className='text-red-500 text-sm' key={0}>{err}</p> : '' 
                    )
                }
        </div>

        <div className='flex flex-col'>
            <label className='mb-2 font-bold' htmlFor="stok">Stok:*</label>
            <input 
                name='stok'
                id='stok'
                type='number' 
                placeholder=''
                autoComplete='off'
                defaultValue={0}
                className={
                    `border rounded-lg px-4 py-2 outline-none focus:border-secondary focus:border-2 ${errorFormValidation.amount ? 'border-red-500' : ''}`
                }/>
                {errorFormValidation.stok && 
                    errorFormValidation.stok.map((err, index) => index === 0 ? 
                    <p className='text-red-500 text-sm' key={0}>{err}</p> : '' )
                }
        </div>

        <div className='flex flex-col'>
            <label className='mb-2 font-bold' htmlFor="harga">Harga (RP):*</label>
            <input 
                name='harga'
                id='harga'
                type='number' 
                placeholder=''
                autoComplete='off'
                defaultValue={0}
                className={
                    `border rounded-lg px-4 py-2 outline-none focus:border-secondary focus:border-2 ${errorFormValidation.amount ? 'border-red-500' : ''}`
                }/>
                {errorFormValidation.harga && 
                    errorFormValidation.harga.map((err, index) => index === 0 ? 
                    <p className='text-red-500 text-sm' key={0}>{err}</p> : '' )
                }
        </div>

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

            {errorFormValidation.kategori && 
                errorFormValidation.kategori.map((err, index) => index === 0 ? 
                <p className='text-red-500 text-sm' key={0}>{err}</p> : '' )
            }
        </div>
        
        <div className='flex flex-col'>
            <label className='mb-2 font-bold' htmlFor="kategori">Gambar:</label>
            <input 
                name='gambar'
                id='gambar'
                type='file' 
                className={
                    `border rounded-lg px-4 py-2 outline-none focus:border-secondary focus:border-2 ${errorFormValidation.gambar ? 'border-red-500' : ''}`
                }/>
                {errorFormValidation.gambar && 
                    errorFormValidation.gambar.map((err, index) => index === 0 ? 
                        <span  key={0}
                            className='text-red-500 text-sm'> 
                            Allowed Extetions: <br></br>
                            {allowedImageExtentions.join('\n')}
                        </span>
                     : '' )
                }
        </div>
        

        <div className='flex flex-col'>
            <button
                disabled={isCreatingItem}
                type='submit'
                className='bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600
                disabled:bg-indigo-300'>
                Submit
            </button>
        </div>
    </form>
  )
}
