import React from 'react'
import { Cpu } from "@phosphor-icons/react";
import { Separator } from '../ui/separator';


interface User {
    userId: string;
    email: string;
    fullName: string;
    profileImage: string;
}

type MessageProp = {
    message: {
        id: string;
        text: string;
        sender: User;
        timestamp: string;
    }
}

const Message = ({ message }: MessageProp) => {    
    const isBot = message.sender.fullName == 'Chat Bot';
    return (
        <>
            {!isBot ? (
                <div className='max-w-2xl mx-auto'>
                    <div className='flex space-x-5'>
                        <div className='w-10 h-10 rounded-full border flex items-center justify-center p-1'>
                            <img src={message.sender.profileImage} alt="" className='h-8 w-8 rounded-full' />
                        </div>
                        <div className='flex flex-col'>
                            <h2 className='font-semibold'>{message.sender.fullName}</h2>
                            <p className='pt-1'>
                                {message.text}
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
                            <h2 className='font-semibold'>{message.sender.fullName}</h2>
                            <p className='pt-1'>
                                {message.text}
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
