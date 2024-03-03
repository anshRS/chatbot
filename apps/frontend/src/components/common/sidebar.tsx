'use client'

import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { toggleChatSideBar } from '@/redux/slices/app';
import NewChat from '../chat/newchat';
import ChatRow from '../chat/chatrow';


interface Message {
    id: string;
    text: string;
}

interface Chat {
    id: string;
    topic: string;
    messages: Message[];
}

const Sidebar = () => {
    const chatsidebar = useSelector((state: RootState) => state.app.chatsidebar)
    const chatHistory = useSelector((state: RootState) => state.chat.chatHistory);

    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.auth.user)

    return (
        <>
            <div className='w-[260px] hidden h-screen md:block bg-sidebar'>
                <div className='h-full rounded-lg py-2 flex flex-col justify-between gap-3'>
                    <div className='px-2 overflow-y-auto custom-scrollbar'>
                        <NewChat />
                        {
                            chatHistory.map((chat: Chat) => {
                                return (
                                    <ChatRow key={chat.id} id={chat.id} />
                                )
                            })
                        }
                    </div>

                    <div className='flex gap-3 p-2 hover:bg-input cursor-pointer items-center rounded-md'>
                        <Avatar className='border-2'>
                            <AvatarImage src={user.profileImage} />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <p>{user.fullName}</p>
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
                                        <NewChat />
                                        {
                                            chatHistory.map((chat: Chat) => {
                                                return (
                                                    <ChatRow key={chat.id} id={chat.id} />
                                                )
                                            })
                                        }
                                    </div>

                                    <div className='flex gap-3 p-2 hover:bg-input cursor-pointer items-center rounded-md'>
                                        <Avatar className='border-2'>
                                            <AvatarImage src={user.profileImage} />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                        <p>{user.fullName}</p>
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
