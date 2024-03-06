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

import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
import { ExclamationTriangleIcon, InfoCircledIcon, UpdateIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import axios from '@/utils/axios';

interface IResetPasswordConfirm {
    new_password: string;
    re_new_password: string;
}

const ResetPasswordConfirmSchema = Yup.object().shape({
    new_password: Yup.string()
        .required("This is required field")
        .min(8, "Password must be at least 8 characters"),
    re_new_password: Yup.string()
        .required("This is required field")
        .min(8, "Password must be at least 8 characters")
        .oneOf([Yup.ref('new_password')], 'Passwords must match'),
});

const ResetPasswordConfirmPage = ({ params }: {
    params: {
        uid: string,
        token: string
    }
}) => {
    const [server_error, setServerError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    
    const defaultValues = {
        new_password: "",
        re_new_password: "",
    };
    
    const methods = useForm<IResetPasswordConfirm>({
        resolver: yupResolver(ResetPasswordConfirmSchema),
        defaultValues,
    });

    const onSubmit = async (data: IResetPasswordConfirm) => {
        try {
            setLoading(true);
            const response = await axios.post("/auth/users/reset_password_confirm/", {
                uid: params.uid,
                token: params.token,
                ...data,
            }, {
                headers: {
                    "Content-Type": "application/json",
                }
            })
            setMessage("Your password has been changed. You may now close this page.")
            setServerError(null);
        } catch (error: any) {
            setServerError("Invalid reset password link. Please try again or request a new reset password email.")
            setMessage(null);        
        } finally {
            methods.reset();
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
                        name="new_password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>New Password</FormLabel>
                                <FormControl>
                                    <Input placeholder='Enter your new password' type='password' autoComplete='off' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={methods.control}
                        name="re_new_password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirm New Password</FormLabel>
                                <FormControl>
                                    <Input placeholder='Re-enter your new password' type='password' autoComplete='off' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className='w-full' disabled={loading}>
                        {loading && <UpdateIcon className='animate-spin h-4 w-4 mr-2' />}
                        Submit
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

export default ResetPasswordConfirmPage
