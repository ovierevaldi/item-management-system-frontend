"use client"

import React from 'react'
import { configMenus } from '@/configs/config';
import { useRouter } from "next/navigation";

export default function NavigationButtons({menu}) {
    const router = useRouter();

    const goToMenu = (route) => {
        router.push(route)
    };


    return (
    <div>
        {configMenus.map((menu) => 
            <button
                onClick={() => goToMenu(menu.route)}
                key={menu.name}
                className='flex items-center mb-4 hover:bg-indigo-500/80 rounded-lg hover:text-white p-2 w-full gap-x-4'>
                <menu.icon size={15}/>
                <p 
                    className='text-center '>
                    {menu.name}
                </p>
            </button>
        )}
    </div>
    )
}
