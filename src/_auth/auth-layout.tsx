import { Outlet, Navigate } from 'react-router-dom'
import {useState} from "react";

const AuthLayout = () => {

    // @ts-ignore
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    return (
        <>
            {isAuthenticated ? (
                <Navigate to="/" />
            ) : (
                <>
                    <section
                        className="flex flex-1 justify-center items-center flex-col py-10"
                    >
                        <Outlet />
                    </section>

                    <img
                        src="/assets/images/side-slider.png"
                        alt="Logo"
                        className="hidden xl:block h-screen w-1/2 object-cover bg-no-repeat"
                    />
                </>
            )}
        </>
    )
}

export default AuthLayout