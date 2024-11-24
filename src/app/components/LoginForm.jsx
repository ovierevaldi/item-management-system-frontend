"use client";

import ApiProvider from "@/libs/api-provider";
import sesStorageProvider from "@/libs/session-storage";
import zodValidation from "@/libs/zod-validation";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
    const router = useRouter();
    const { parseUser } = zodValidation();
    const [errorForm, setErrorForm] = useState({});
    const [errorCallApi, setErrorCallApi] = useState('');
    const [isLoadApi, setIsLoadApi] = useState(false);

    const onLoginFormSubmit = async (event) => {
        event.preventDefault();
        const userData = new FormData(event.target);
        const formValues = Object.fromEntries(userData.entries());

        const validationResult = parseUser(formValues);

        if(!validationResult.success){
            setErrorForm(validationResult.error.flatten().fieldErrors)
            return;
        };
        
        clearError();

        const response = await signInUser(validationResult.data);

        if(response){
            // Save user data into session storage
            sesStorageProvider().saveUserData(response.data);
            
            router.push('/');
        }
    };

    const signInUser = async (userData) => {
        try {
            setIsLoadApi(true);
            const user = await ApiProvider.signUser(userData);
            return user;
        } catch (error) {
            console.log(error)
            if(error.response.data.message){
                setErrorCallApi(error.response.data.message);
            }
            else{
                setErrorCallApi("Couldn't Connect to Server")
            }
            return null;
        } finally {
            setIsLoadApi(false);
        }
    }

    const clearError = () => {
        setErrorForm({})
        setErrorCallApi('');
    }

    return (
        <form onSubmit={onLoginFormSubmit} className="space-y-8">
            <div>
                {
                    isLoadApi && <p className="text-center ">Loading...</p>
                }

                {
                    errorCallApi && <p className="text-center mb-8 text-rose-500 font-bold">{errorCallApi}</p>
                }

                <label htmlFor="username" className="block text-sm font-medium text-gray-600">
                    Email Address
                </label>
                <input 
                    type="text" 
                    id="username"
                    name="username"
                    className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring focus:ring-indigo-200 focus:border-indigo-500"
                    placeholder="Enter your username"
                    autoComplete="username"
                />
                {
                    errorForm.username && errorForm.username.map((err, index) => index === 0 ? <p className='text-rose-500 text-sm pt-2 px-2' key={0}>{err}</p> : '')  
                }
            </div>
            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                    Password
                </label>
                <input 
                    type="password" 
                    id="password"
                    name="password"
                    autoComplete="off"
                    className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring focus:ring-indigo-200 focus:border-indigo-500"
                    placeholder="Enter your password"
                />
                 {
                    errorForm.password && errorForm.password.map((err, index) => index === 0 ? <p className='text-rose-500 text-sm pt-2 px-2' key={0}>{err}</p> : '')  
                }
            </div>

            <button
                type="submit"
                disabled={isLoadApi}
                className="w-full px-4 py-2 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 focus:ring focus:ring-indigo-200 focus:outline-none
                disabled:bg-indigo-200
                ">
                Login
            </button>
        </form>
    );
}
