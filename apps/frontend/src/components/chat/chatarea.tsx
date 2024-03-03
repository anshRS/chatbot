'use client'

import { useMessages } from "@/hooks/useMessages";
import Message from "./message";
import { StackIcon } from "@radix-ui/react-icons";

type ChatAreaProps = {
    chatId: string;
}

const ChatArea = ({ chatId }: ChatAreaProps) => {
    
    const messages = useMessages(chatId);        

    return (
        <div className="flex-1 overflow-y-scroll overflow-x-hidden custom-scrollbar py-5 px-2 md:p-5">
            {messages?.length == 0 && (
                <div className='pb-[200px] pt-4 md:pt-10'>
                <div className='mx-auto max-w-2xl px-4 flex flex-col items-center gap-5'>
                    <StackIcon className='w-20 h-20' />

                    <div className='rounded-lg border border-foreground/15 bg-tertiary p-8'>
                        <h1 className='mb-2 text-lg font-semibold'>Welcome to Chat Droid AI Chatbot!</h1>
                        <p className='mb-2 text-muted-foreground'>
                            Experience the future of chatbots with our Next.js 14 powered platform, featuring sleek shadcn styling, backed by Django and Langchain.
                        </p>
                    </div>
                </div>
            </div>
            )          
            }
            
            {messages?.map((message: IMessage) => (
                <Message key={message.id} message={message}/>
            ))}
        </div>
    )
}

export default ChatArea
