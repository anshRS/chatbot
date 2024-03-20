'use client'

import React, { useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { toggleChatSideBar } from '@/redux/slices/app';
import NewChat from '../chat/newchat';
import ChatRow from '../chat/chatrow';
import axios from '@/utils/axios';
import { UpdateIcon } from '@radix-ui/react-icons';
import { setChats } from '@/redux/slices/chat';

interface Chat {
    id: number;   
    title: string
}

const Sidebar = () => {
    const chatsidebar = useSelector((state: RootState) => state.app.chatsidebar)
    const { user, token } = useSelector((state: RootState) => state.auth);   
    const { chats } = useSelector((state: RootState) => state.chat);   
    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch();

    const getChats = async () => {
        try {
            const response = await axios.get('/chats/', {
                headers: {
                    Authorization: `JWT ${token}`,
                }
            });            
            setLoading(false);                   
            dispatch(setChats(response.data));            
            return response.data;
        } catch (error) {
            console.error('Error fetching chats:', error);            
            return [];
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const chats = await getChats();            
        }
        fetchData();
    }, [])

    return (
        <>
            <div className='w-[260px] hidden h-screen md:block bg-sidebar'>
                <div className='h-full rounded-lg py-2 flex flex-col justify-between gap-3'>
                    <div className='px-2 overflow-y-auto custom-scrollbar'>                        
                        <NewChat/> 
                        {
                            loading
                                ? <div className='w-full flex flex-col items-center justify-center'>
                                    <UpdateIcon className='animate-spin h-4 w-4 mr-2' />
                                </div>
                                : chats.map((chat: Chat) => {
                                    return (
                                        <ChatRow key={chat.id} id={chat.id} title={chat.title}/>
                                    )
                                })
                        }
                    </div>

                    <div className='flex gap-3 p-2 hover:bg-input cursor-pointer items-center rounded-md'>
                        <Avatar className='border-2'>
                            {user ? <AvatarImage src={user.profileImage} /> : null}
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        {user ? <p>{user.full_name}</p> : null}

                    </div>

                </div>
            </div>

            <div>

                {chatsidebar.open && (
                    <div className="md:hidden fixed inset-0 overflow-y-auto z-50 bg-gray-800 bg-opacity-75">
                        <div className="flex h-screen relative">
                            <div className="absolute top-0 right-0 p-1 z-100">
                                <button
                                    onClick={() => {
                                        dispatch(toggleChatSideBar())
                                    }}
                                    className="flex items-center justify-center h-12 w-12 rounded-full focus:outline-none  focus:bg-gray-600"
                                >
                                    <svg className="h-6 w-6  text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" className='text-white' />
                                    </svg>
                                </button>
                            </div>
                            <div className="max-w-64 w-full bg-sidebar shadow-xl">
                                <div className='h-full rounded-lg py-2 flex flex-col justify-between gap-3'>
                                    <div className='px-2 overflow-y-auto custom-scrollbar'>                                       
                                        <NewChat/>
                                        {
                                            chats.map((chat: Chat) => {
                                                return (
                                                    <ChatRow key={chat.id} id={chat.id} title={chat.title}/>
                                                )
                                            })
                                        }
                                    </div>

                                    <div className='flex gap-3 p-2 hover:bg-input cursor-pointer items-center rounded-md'>
                                        <Avatar className='border-2'>
                                            {user ? <AvatarImage src={user.profileImage} /> : null}
                                            <AvatarImage src="" />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                        {user ? <p>{user.full_name}</p> : null}
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

        </>
    )
}

export default Sidebar
