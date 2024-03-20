'use client'

import { addChat } from '@/redux/slices/chat';
import { RootState } from '@/redux/store';
import axios from '@/utils/axios';
import { Pencil2Icon, StackIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';

const NewChat= () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { token } = useSelector((state: RootState) => state.auth);

    const createNewChat = async () => {
        try {
            const response = await axios.post('/chats/', {}, {
                headers: {
                    Authorization: `JWT ${token}`,
                },
            });
            const newChat = response.data;            
            dispatch(addChat(newChat))             
            router.push(`/chat/${newChat.id}`);
            
        } catch (error) {
            console.error('Error creating new chat:', error);                       
        }   
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
