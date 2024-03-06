'use client'

import RegisterForm from '@/components/auth/RegisterForm'
import { RootState } from '@/redux/store';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';

const Register = () => {
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
                <h1 className='font-bold text-2xl'>Create an account</h1>
                <p>Enter details to create account</p>
            </div>
            <RegisterForm />
            <p className="text-center mt-3">
                Already have an account?
                <Link href="/auth/login" className="text-blue-500 hover:text-blue-800 ml-1">
                    Login
                </Link>
            </p>
        </div>
    )
}

export default Register
