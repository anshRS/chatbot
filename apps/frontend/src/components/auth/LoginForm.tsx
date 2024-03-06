'use client'

import React, { useState } from 'react'
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from '@/utils/axios';

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
import { ExclamationTriangleIcon, UpdateIcon } from '@radix-ui/react-icons';
import { useDispatch } from 'react-redux';
import { logIn } from '@/redux/slices/auth';
import Link from 'next/link';

interface LoginFormInterface {
    email: string;
    password: string;
}

const LoginSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email must be a valid email address"),
    password: Yup.string().required("Password is required"),
});

const LoginForm = () => {
    const dispatch = useDispatch();

    const [server_error, setServerError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const defaultValues = {
        email: "",
        password: "",
    };

    const methods = useForm<LoginFormInterface>({
        resolver: yupResolver(LoginSchema),
        defaultValues,
    });

    const onSubmit = async (data: LoginFormInterface) => {
        // make api call here
        try {
            setLoading(true);
            const response = await axios.post("/auth/jwt/create/", {
                ...data,
            }, {
                headers: {
                    "Content-Type": "application/json",
                }
            })
            setServerError(null);
            dispatch(logIn({
                isLoggedIn: true,
                token: response.data.access,
            }))
        } catch (error: any) {
            setServerError(error.detail)
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <Form {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-2">
                    <FormField
                        control={methods.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder='Enter your email' autoComplete='email' {...field} />
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

                    <Link href="/account/reset-password" className='text-blue-500 hover:text-blue-800'>
                        Forgot password?
                    </Link>

                    <Button type="submit" className='w-full' disabled={loading}>
                        {loading && <UpdateIcon className='animate-spin h-4 w-4 mr-2' />}
                        Login
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

export default LoginForm
