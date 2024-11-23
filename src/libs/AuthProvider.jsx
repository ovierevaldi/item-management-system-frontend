'use client'

import { createContext, useContext } from "react"
import sesStorageProvider from "./session-storage";

const {getUserData, saveUserData, removeUserData } =  sesStorageProvider();

const AuthContext = createContext();

export default function AuthProvider({ children }) {

    const createUserSession = (userData) => {
        saveUserData(userData);
    }

    const logOut = () => {
        removeUserData();
    }

    const isAuthenticated = () => !!getUserData();

    const getUserInfo = () => getUserData();

    return(
        <AuthContext.Provider value={{createUserSession, logOut, isAuthenticated, getUserInfo}}>
            {children}
        </AuthContext.Provider>
    )
};

export const useAuth = () => useContext(AuthContext);