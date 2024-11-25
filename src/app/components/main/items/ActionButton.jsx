'use client'

import React from 'react'

export default function ActionButton({children, type, id, handleActionBtnClick}) {
    const onBtnClick = () => {
        handleActionBtnClick(id, type);
    }

    return (
        <button
            onClick={onBtnClick}
            className={`${type === 'Update' ? 'bg-emerald-600/90  hover:bg-emerald-700' : 'bg-rose-600/90  hover:bg-rose-700'} px-4 py-1 rounded-md`}>
            <span className='text-white text-sm'>{children}</span>
        </button>
    )
}
