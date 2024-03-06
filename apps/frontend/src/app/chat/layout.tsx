"use client"

import Header from '@/components/chat/header'
import Sidebar from '@/components/common/sidebar'
import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useRouter } from 'next/navigation';
import axios from '@/utils/axios';
import { setUserInfo, signOut } from '@/redux/slices/auth';
import { ReloadIcon } from '@radix-ui/react-icons';
import { toast } from 'react-toastify';

const ChatAreaLayout = ({
    children,
}: {
    children: React.ReactNode
}) => {
    const { isLoggedIn, token } = useSelector((state: RootState) => state.auth);
    const router = useRouter();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isLoggedIn) {
            router.push("/auth/login");
            return;
        }

    }, [isLoggedIn, router])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/auth/users/me/", {
                    headers: {
                        Authorization: `JWT ${token}`,
                    }
                })
                dispatch(setUserInfo({
                    user: {
                        ...response.data,
                        profileImage: `https://ui-avatars.com/api/?name=${response.data.full_name}`
                    },
                }))
                setLoading(false);
            } catch (error: any) {
                dispatch(signOut());
                toast.error("Unauthorized access detected. Please log in again", {
                    position: "top-center",
                })               
            }
        }

        if (isLoggedIn && token) {
            fetchData();
        }
        
    }, [dispatch, isLoggedIn, token])

    if (loading) {
        return (
            <div className='flex h-screen'>
                <div className="flex-1 flex flex-col justify-center items-center mt-20 gap-3">
                    <ReloadIcon className='h-10 w-10 animate-spin' />
                    <p className='text-2xl'>Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className='flex'>
            <Sidebar />
            <div className='w-full flex flex-col overflow-hidden h-screen bg-tertiary'>
                <Header />
                {children}
            </div>
        </div>
    )
}

export default ChatAreaLayout
