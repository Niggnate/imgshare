import React, {createContext, useContext, useEffect, useState} from "react";
import {IContextType, IUser} from "@/types";
import {getCurrentUser} from "@/lib/appwrite/api.ts";
import {useNavigate} from "react-router-dom";

const INITIAL_USER = {
    id: '',
    name: '',
    username: '',
    email: '',
    imageUrl: '',
    bio: ''
}

const INITIAL_STATE = {
    user: INITIAL_USER,
    isLoading: false,
    isAuthenticated: false,
    setUser: () => {},
    setIsAuthenticated: () => {},
    checkAuthenticatedUser: async () => false as boolean
}

const AuthContext = createContext<IContextType>(INITIAL_STATE)

const  AuthenticationProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<IUser>(INITIAL_USER)
    const [isLoading, setIsLoading] = useState(false)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const navigate = useNavigate()

    const checkAuthenticatedUser = async () => {
        try {
            const currentAccount = await getCurrentUser()
            if (currentAccount) {
                setUser({
                    id: currentAccount.$id,
                    name: currentAccount.name,
                    username: currentAccount.username,
                    email: currentAccount.email,
                    imageUrl: currentAccount.imageUrl,
                    bio: currentAccount.bio
                })

                setIsAuthenticated(true)
                return true
            }
            return false
        } catch (e) {
            console.log(e)
            return false
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (localStorage.getItem('cookieFallback') === '[]' || localStorage.getItem('cookieFallback') === null) {
            navigate('sign-in')
        }
        checkAuthenticatedUser()
    }, [])

    const value = {
        user,
        setUser,
        isLoading,
        isAuthenticated,
        setIsAuthenticated,
        checkAuthenticatedUser
    }

    return (
        <AuthContext.Provider value={value}>
            { children }
        </AuthContext.Provider>
    )
}

const useUserContext = () => useContext(AuthContext)

export default AuthenticationProvider
export {
    useUserContext
}