'use client'

import React, { useState } from 'react'
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import axios from '@/utils/axios';
import "react-toastify/dist/ReactToastify.css";

import { ExclamationTriangleIcon, InfoCircledIcon, UpdateIcon } from "@radix-ui/react-icons"

import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"

interface RegisterFormInterface {
    full_name: string;
    email: string;
    password: string;
    re_password: string;
}

const RegisterSchema = Yup.object().shape({
    full_name: Yup.string().required('Full name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required').min(8, "Password must be at least 8 characters"),
    re_password: Yup.string().required('Confirm Password is required').min(8, "Password must be at least 8 characters").oneOf([Yup.ref('password')], 'Passwords must match'),
});

const RegisterForm = () => {
    const [server_error, setServerError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const defaultValues = {
        full_name: "",
        email: "",
        password: "",
        re_password: "",
    };

    const methods = useForm<RegisterFormInterface>({
        resolver: yupResolver(RegisterSchema),
        defaultValues,
    });   

    const onSubmit = async (data: RegisterFormInterface) => {
        // make api call here
        try {
            setLoading(true);
            const response = await axios.post("/auth/users/", {
                ...data,
            }, {
                headers: {
                    "Content-Type": "application/json",
                }
            })
            setMessage("An activation link has been sent to your email. Please check your inbox and follow the instructions to activate your account.");
            setServerError(null);  
            methods.reset();         
        } catch (error: any) {
            if (error.email) {
                setServerError(error.email[0]);
            } else if (error.password) {
                setServerError("Please enter a strong password. It must contain at least one uppercase letter, one lowercase letter, one number, and one special character.")
            } else {
                setServerError("An unknown error occurred.");
            }
            setMessage(null);            
        } finally {            
            setLoading(false);
        } 
    }

    return (
        <>
        {message && (
                <Alert variant="success" className='mb-5'>
                    <InfoCircledIcon className="h-4 w-4" />
                    <AlertTitle>Info</AlertTitle>
                    <AlertDescription>
                        {message}
                    </AlertDescription>
                </Alert>
            )}

            <Form {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-2">
                    <FormField
                        control={methods.control}
                        name="full_name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                    <Input placeholder='Enter your name' autoComplete='username' {...field} />
                                </FormControl>
                                <FormDescription>
                                    This is your public display name.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={methods.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder='Enter email'autoComplete='email' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={methods.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input placeholder='Enter your password' type='password' autoComplete='off' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={methods.control}
                        name="re_password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                    <Input placeholder='Renter your password' type='password' autoComplete='off' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button disabled={loading} type="submit" className='w-full'>
                        {loading && <UpdateIcon className='animate-spin h-4 w-4 mr-2'/>}
                        Register
                    </Button>
                </form>
            </Form>
            {server_error && (
                <Alert variant="destructive" className='mt-5'>
                    <ExclamationTriangleIcon className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                        {server_error}
                    </AlertDescription>
                </Alert>
            )}
        </>
    )
}

export default RegisterForm
