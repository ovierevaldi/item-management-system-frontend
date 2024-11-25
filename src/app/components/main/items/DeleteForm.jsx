import ApiProvider from '@/libs/api-provider';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

export default function DeleteForm({id, handleSuccessDelete}) {
    const [isDeleting, setIsDeleting] = useState(false);

    const onYesClick = async () => {
        const response = await deleteItem(id);
        
        if(response.status === 200){
            toast.success('Success Delete Item')
            handleSuccessDelete();
        }
        else{
            toast.success('Cannot Delete Item')
        }
    }

    const deleteItem = async (item_id) => {
        setIsDeleting(true);
        
        try {
            const response = await ApiProvider.deleteItem(item_id);

            return response;
        } catch (error) {
            console.log(error)
            
            if(error.response.data.message){
                toast.error(error.response.data.message);
            }
            else{
                toast.error("Internal Server Error")
            }
        }
        finally{
            setIsDeleting(false)
        }
    }

    return (
        <div className='min-w-[250px] p-4'>
            <p className='text-lg font-semibold text-center mb-4'>Are you sure?</p>
            <div className='flex justify-center gap-x-6'>
                <button
                    disabled={isDeleting}
                    onClick={handleSuccessDelete}
                    className='bg-rose-500 text-white px-8 py-2 rounded-lg hover:bg-red-700 disabled:bg-rose-300'>
                    No
                </button>
                <button
                    disabled={isDeleting}
                    onClick={onYesClick}
                    className='bg-green-500 text-white px-8 py-2 rounded-lg hover:bg-green-700 disabled:bg-green-300'>
                    Yes
                </button>
            </div>
        </div>
    )
}
