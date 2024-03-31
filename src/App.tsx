import { Routes, Route } from 'react-router-dom'

import { SigninFormElement, SignupFormElement } from "./_auth/form-elements";

import AuthLayout from "./_auth/auth-layout.tsx";
import RootLayout from "./_root/root-layout.tsx";

import { Toaster } from "@/components/ui/toaster.tsx";
import {
    People,
    CreatePost,
    Dashtop,
    EditPost,
    Explore,
    PostDetails,
    Profile,
    Shared,
    UpdateProfile
} from "@/_root/pages";

import './globals.css'

const App = () => {
    return (
        <main className="flex h-screen">
            <Routes>
                {/*  Public routes  */}
                <Route element={<AuthLayout />}>
                    <Route path="/sign-in" element={<SigninFormElement />} />
                    <Route path="/sign-up" element={<SignupFormElement />} />
                </Route>

                {/*  Private routes  */}
                <Route element={<RootLayout />}>
                    <Route index element={<Dashtop />} />
                    <Route path={"/explore"} element={<Explore />}/>
                    <Route path={"/people"} element={<People />} />
                    <Route path={"/shared"} element={<Shared />} />
                    <Route path={"/create-post"} element={<CreatePost />} />
                    <Route path={"/update-post/:id"} element={<EditPost />} />
                    <Route path={"/posts/:id"} element={<PostDetails />} />
                    <Route path={"/profile/:id"} element={<Profile />} />
                    <Route path={"/update-profile/:id"} element={<UpdateProfile />} />
                </Route>
            </Routes>

            <Toaster />
        </main>
    )
}

export default App