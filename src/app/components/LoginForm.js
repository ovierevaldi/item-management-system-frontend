"use client";

import { useRouter } from "next/navigation";

export default function LoginForm() {
    const router = useRouter();

    const onLoginFormSubmit = (event) => {
        event.preventDefault();
        router.push('/dashboard');
    };

    return (
        <form onSubmit={onLoginFormSubmit} className="space-y-8">
            <div>
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
                    required
                />
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
                    required
                />
            </div>

            <button
                type="submit"
                className="w-full px-4 py-2 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 focus:ring focus:ring-indigo-200 focus:outline-none">
                Login
            </button>
        </form>
    );
}
