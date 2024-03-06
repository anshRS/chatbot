'use client'

import LoginForm from '@/components/auth/LoginForm'
import { RootState } from '@/redux/store';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';

const Login = () => {
    const { isLoggedIn } = useSelector((state: RootState) => state.auth);
    const router = useRouter();

    useEffect(() => {
        if(isLoggedIn) {
            router.push("/chat");
            return;
        }
    }, [isLoggedIn])

    return (
        <div className='mx-auto w-full p-10 md:p-0 md:w-[400px] min-w-[300px] flex flex-col justify-center'>
            <div className='flex flex-col space-y-2 text-center mb-5'>
                <h1 className='font-bold text-2xl'>Welcome back</h1>
                <p>Sign in to your account</p>
            </div>
            <LoginForm />
            <p className='text-center mt-3'>
                New on our platform
                <Link href="/auth/register" className='text-blue-500 hover:text-blue-800 ml-1'>
                    Create an account
                </Link>
            </p>
        </div>
    )
}

export default Login
