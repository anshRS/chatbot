import React from 'react'
import { Cpu } from "@phosphor-icons/react";
import { Separator } from '../ui/separator';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

type MessageProp = {
    message: IMessage,    
}

const Message = ({ message }: MessageProp) => {   
    const { user } = useSelector((state: RootState) => state.auth);
    return (
        <>
            {message.sender_email ? (
                <div className='max-w-2xl mx-auto'>
                    <div className='flex space-x-5'>
                        <div className='w-10 h-10 rounded-full border flex items-center justify-center p-1'>
                            <Avatar className='w-8 h-8'>
                                {user && <AvatarImage src={user && user.profileImage} />}
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </div>

                        <div className='flex flex-col'>
                            <h2 className='font-semibold'>{user && user.full_name}</h2>
                            <p className='pt-1 whitespace-pre-wrap'>
                                {message.content}
                            </p>
                        </div>
                    </div>
                    <Separator className='mb-5 w-full my-5' />
                </div>
            ) : (
                <div className='max-w-2xl mx-auto'>
                    <div className='flex space-x-5'>
                        <div className='w-10 h-10 rounded-full border flex items-center justify-center p-1'>
                            <Cpu size={32} />
                        </div>
                        <div className='flex flex-col'>
                            <h2 className='font-semibold'>ChatBot</h2>                          
                                <p className='pt-1 whitespace-pre-wrap'>                                    
                                    {message.content}
                                </p>
                        </div>
                    </div>
                    <Separator className='mb-5 w-full my-5' />
                </div>                
            )}
        </>
    )
}

export default Message
