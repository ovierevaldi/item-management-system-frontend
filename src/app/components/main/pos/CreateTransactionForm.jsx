'use client'

import ApiProvider from '@/libs/api-provider';
import debounce from 'lodash.debounce';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import ListItemDropdown from './ListItemDropdown';
import currency from '@/libs/currency';
import zodValidation from '@/libs/zod-validation';

export default function CreateTransactionForm() {
    const [listItem, setListItem] = useState([]);
    const [inputNama, setInputNama] = useState('')
    const [errorApiMessage, setErrorApiMessage] = useState("");
    const [isSearchItemFocus, setIsSearchItemFocus] = useState(false);
    const [selectedItemDetail, setSelectedItemDetail] = useState({nama: '', harga: 0, kategori: ''});
    const [defaultItemList, setDefaultItemList] = useState([]);
    const [jumlahItem, setJumlahItem] = useState(0);
    const [formValidationErrors, setFormValidationErrors] = useState([]);
    const [isPostingTransaction, setIsPostingTransaction] = useState(false)

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await ApiProvider.getItems();
                if(response.status === 200){
                    setListItem(response.data);
                    setDefaultItemList(response.data);
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

        fetchItems();
    }, [])

    function onInputNamaChange(e){
        setInputNama(e.target.value)
        searchItem(e.target.value);
    };

    const searchItem = debounce(async (searchquery) => {
        setListItem(defaultItemList);
        if(searchquery){
            setListItem((prev) => prev.filter(item => item.nama.toLowerCase().includes(searchquery.toLowerCase())));
        }
    })

    const onInputRoomFocus = (state) => {
        setIsSearchItemFocus(state);
    }

    function onItemClicked(id){
        setIsSearchItemFocus(false);
        setSelectedItemDetail((prev) => {
            const newDetail = listItem.find((val) => val.id === id);
            setInputNama(newDetail.nama);
            return newDetail
        });

        
    };

    const onFormSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const formValues = Object.fromEntries(formData.entries());

        // Convert some string form data values
        formValues.jumlah_item = parseInt(formData.get('jumlah_item'));

        const validationResult = zodValidation().parseTransaction(formValues);

        if(!validationResult.success){
            setFormValidationErrors(validationResult.error.flatten().fieldErrors)
            return;
        };

        clearError();
        const transactionPayload = {
            id: selectedItemDetail.id,
            jumlah_item: validationResult.data.jumlah_item
        }

        const response = await postTransactionItem(transactionPayload);

        if(response){
            // Save user data into session storage
            toast.success('Success Create Transaction');
        }
    };

    const postTransactionItem = async (itemData) => {
        try {
            setIsPostingTransaction(true);
            return await ApiProvider.postTransaction(itemData);
        } catch (error) {
            if(error.response.data.message){
                setErrorApiMessage(error.response.data.message);
            }
            else{
                setErrorApiMessage("Internal Server Error")
            }
            return null;
        } finally {
            setIsPostingTransaction(false);
        }
    }

    const clearError = () => {
        setFormValidationErrors({})
        setErrorApiMessage('');
    }

  return (
    <form 
        onSubmit={onFormSubmit} 
        className="space-y-6 w-full">
        
        {errorApiMessage && <p className="text-red-500 text-center mb-4">{errorApiMessage}</p>}
        
        <div className='flex flex-col'>
            <label className='mb-2 font-bold' htmlFor="nama">Nama Barang:</label>
            <div className='relative'>
                <input 
                    name='nama'
                    id='nama'
                    type='text'
                    autoComplete='off'
                    value={inputNama}
                    onChange={onInputNamaChange}
                    onFocus={() => onInputRoomFocus(true)}
                    className={
                        `border rounded-lg px-4 py-2 outline-none focus:border-secondary focus:border-2 w-full`
                    }>
                </input>
                {formValidationErrors.nama && 
                    formValidationErrors.nama.map((err, index) => index === 0 ? 
                        <p className='text-red-500 text-sm' key={0}>{err}</p> : '' 
                    )
                }
                <ListItemDropdown 
                    listItem={listItem}
                    handleOnClick={onItemClicked} isInputFocus={isSearchItemFocus}
                />
            </div>
        </div>
        {
            selectedItemDetail.nama && 
            <div>
                <p className='font-semibold'>Detail: </p>
                <div className='p-2 space-y-1'>
                    <p>Harga: {currency().convertToRupiah(selectedItemDetail.harga)}
                    </p>
                    <p>Stok: {selectedItemDetail.stok}</p>
                    <p>Kategori: {selectedItemDetail.kategori}
                    </p>
                </div>
            </div>
        }

        <div>
        <label
            htmlFor="jumlah_item"
            className="mb-2 font-bold"
        >
            Jumlah Pembelian
        </label>
        <input
            type="number"
            id="jumlah_item"
            name="jumlah_item"
            value={jumlahItem}
            onChange={(e) => setJumlahItem(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
        {formValidationErrors.jumlah_item && 
                    formValidationErrors.jumlah_item.map((err, index) => index === 0 ? 
                        <p className='text-red-500 text-sm' key={0}>{err}</p> : '' 
                    )
                }
        </div>

        <p>Total: {currency().convertToRupiah(selectedItemDetail.harga * jumlahItem)}</p>

        <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
        Submit
        </button>
    </form>
  )
}
