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

interface RegisterFormInterface {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const RegisterSchema = Yup.object().shape({
    fullName: Yup.string().required('Full name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string().required('Confirm Password is required'),
});

const RegisterForm = () => {

    const defaultValues = {
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
    };    

    const methods = useForm<RegisterFormInterface>({
        resolver: yupResolver(RegisterSchema),
        defaultValues,        
    });

    const router = useRouter();

    function onSubmit(data: RegisterFormInterface) {        
        // make api call here
        console.log(data)
    }

    return (
        <Form {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-2">
                <FormField
                    control={methods.control}
                    name="fullName"
                    render={({ field }) => (        
                        <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                                <Input placeholder='Enter your name' {...field} />
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
                                <Input placeholder='Enter email' {...field} />
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
                <FormField
                    control={methods.control}
                    name="confirmPassword"
                    render={({ field }) => (        
                        <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                                <Input placeholder='Renter your password' {...field} />
                            </FormControl>                            
                            <FormMessage />
                        </FormItem>
                    )}
                />                

                <Button type="submit" className='w-full'>Register</Button>
            </form>
        </Form>
    )
}

export default RegisterForm
