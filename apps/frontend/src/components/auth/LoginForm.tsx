'use client'

import React from 'react'
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from 'next/navigation';

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

interface LoginFormInterface {
    email: string;
    password: string;
}

const LoginSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email must be a valid email address"),
    password: Yup.string().required("Password is required"),
});

const LoginForm = () => {

    const defaultValues = {
        email: "",
        password: "",
    };

    const methods = useForm<LoginFormInterface>({
        resolver: yupResolver(LoginSchema),
        defaultValues,
    });

    const onSubmit = (data: LoginFormInterface) => {
        // make api call here
        console.log(data)
    }

    return (
        <Form {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-2">
                <FormField
                    control={methods.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder='Enter your email' {...field} />
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
                                <Input placeholder='Enter your password' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />                

                <Button type="submit" className='w-full'>Login</Button>
            </form>
        </Form>
    )
}

export default LoginForm
