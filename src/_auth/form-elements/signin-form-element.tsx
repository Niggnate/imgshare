import * as z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button.tsx"
import { useForm } from "react-hook-form";
import {SigninFormElementValidation} from "@/lib/validation";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import Loader from "@/components/shared/loader.tsx";
import {Link, useNavigate} from "react-router-dom";
import {useToast} from "@/components/ui/use-toast.ts";
import {useUserContext} from "@/context/auth-context.tsx";
import {useSignInAccount} from "@/lib/react-query/queries.ts";



const SigninFormElement = () => {

    const navigate = useNavigate()
    const { toast } = useToast()
    const { checkAuthenticatedUser, isLoading: isUserLoading } = useUserContext()

    const { mutateAsync: signinAccount } = useSignInAccount()



    const form = useForm<z.infer<typeof SigninFormElementValidation>>({
        resolver: zodResolver(SigninFormElementValidation),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const onSubmit = async (values: z.infer<typeof SigninFormElementValidation>) => {

        const session = await signinAccount({
            email: values.email,
            password: values.password
        })
        if (!session) return toast({
            title: 'Something went wrong. Please try again!'
        })

        const isLoggedIn = await checkAuthenticatedUser()
        if(isLoggedIn) {
            form.reset()
            navigate('/')
        } else {
            return toast({
                title: 'Something went wrong. Please try again!'
            })
        }

    }

    return (
        <Form { ...form }>

            <div
                className="sm:w-420 flex-center flex-col"
            >
                <p className={"brand-primary h1-bold"}>ImgShare</p>

                <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
                    Sign In to you account
                </h2>

                <p className="text-primary-3 small-medium md:base-regular">
                    Welcome back, please enter your account details.
                </p>

                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col gap-5 w-full mt-4"
                >

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        type="email"
                                        className="shad-input"
                                        { ...field }
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        className="shad-input"
                                        { ...field }
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button
                        type="submit"
                        className="shad-button_primary"
                    >
                        {isUserLoading ? (
                            <div className="flex-center gap-2">
                                <Loader /> Loading ...
                            </div>
                        ) : (
                            "Sign In"
                        )}
                    </Button>

                    <p className="text-small-regular text-dark-2 text-center mt-2">
                        Wanna create an account?
                        <Link
                            to="/sign-up"
                            className="text-primary-4 text-small-semibold ml-2"
                        >
                            Sign Up
                        </Link>
                    </p>
                </form>
            </div>
        </Form>
    )
}

export default SigninFormElement