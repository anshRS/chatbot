'use client'

import { addChat } from '@/redux/slices/chat';
import { Pencil2Icon, StackIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';

const NewChat = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const createNewChat = () => {
        // functionality to create new chat in database      
        let chatId: string = String(Math.floor(Math.random() * 1000000));

        let newChat = {
            id: chatId,
            topic: 'New Chat',
            messages: [],
        };

        dispatch(addChat(newChat));

        router.push(`/chat/${chatId}`)
    }

    return (
        <div className='sticky top-0 left-0 py-2' onClick={createNewChat}>
            <div className='flex justify-between px-2 py-2 rounded-md hover:bg-input cursor-pointer'>
                <div className='flex gap-3'>
                    <StackIcon className='h-6 w-6' />
                    <h1>New chat</h1>
                </div>
                <Pencil2Icon className='h-5 w-5' />
            </div>
        </div>
    )
}

export default NewChat
