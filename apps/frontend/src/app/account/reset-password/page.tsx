'use client'

import React, { useState } from 'react'
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

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
import { Button } from '@/components/ui/button';
import { ExclamationTriangleIcon, InfoCircledIcon, UpdateIcon } from '@radix-ui/react-icons';
import axios from '@/utils/axios';

import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"

interface IResetPassword {
    email: string;
}

const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email must be a valid email address"),
})

const ResetPasswordPage = () => {
    const [loading, setLoading] = useState(false);
    const [server_error, setServerError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    const defaultValues = {
        email: "",
    };

    const methods = useForm<IResetPassword>({
        resolver: yupResolver(ResetPasswordSchema),
        defaultValues,
    });

    const onSubmit = async (data: IResetPassword) => {
        try {
            setLoading(true);
            const response = await axios.post("/auth/users/reset_password/", {
                ...data,
            }, {
                headers: {
                    "Content-Type": "application/json",
                }
            })
            setMessage("Password reset link has been sent to your email. Please check your inbox and follow the instructions.")
            setServerError(null);            
        } catch (error: any) {
            setServerError(error[0])
            setMessage(null);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='flex-1 flex items-center justify-center '>
            <div className='w-full max-w-md p-3'>
                <h1 className='text-center text-2xl font-semibold mb-5'>Reset Password</h1>
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

                        <Button type="submit" className='w-full' disabled={loading}>
                            {loading && <UpdateIcon className='animate-spin h-4 w-4 mr-2' />}
                            Send Email
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
            </div>
        </div>
    )
}

export default ResetPasswordPage
