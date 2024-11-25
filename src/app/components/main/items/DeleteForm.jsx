import React from 'react'
import toast from 'react-hot-toast';

export default function DeleteForm({id, handleSuccessDelete}) {
    const onYesClick = () => {
        toast.success('Success Delete Item')
        handleSuccessDelete();
    }

    return (
        <div className='min-w-[250px] p-4'>
            <p className='text-lg font-semibold text-center mb-4'>Are you sure?</p>
            <div className='flex justify-center gap-x-6'>
                <button 
                    onClick={handleSuccessDelete}
                    className='bg-rose-500 text-white px-8 py-2 rounded-lg hover:bg-red-700'>
                    No
                </button>
                <button 
                    onClick={onYesClick}
                    className='bg-green-500 text-white px-8 py-2 rounded-lg hover:bg-green-700'>
                    Yes
                </button>
            </div>
        </div>
    )
}
