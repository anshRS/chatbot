import React from 'react'
import { StackIcon } from '@radix-ui/react-icons'

const IndexPage = () => {
    return (
        <div className='h-full flex flex-col items-center justify-evenly'> 
            <div className='flex flex-col items-center'>
                <StackIcon className='w-20 h-20 animate-pulse' />
                <p className='text-2xl font-bold'>Welcome to Chat Droid AI Chatbot!</p>
            </div>

            <div className='flex flex-col sm:flex-row gap-3 text-center mx-auto p-2'>
                <div className='border border-foreground/15 rounded-lg p-3 max-w-96'>
                    <h2 className='font-semibold mb-2'>Cutting-Edge Technology</h2>
                    <p>Chat Droid combines Next.js 14 for speed and shadcn styling for a sleek look, backed by Django and Langchain for advanced AI capabilities.</p>
                </div>                             
                <div className='border border-foreground/15 rounded-lg p-3 max-w-96'>
                    <h2 className='font-semibold mb-2'>Future-Ready Chatbot</h2>
                    <p> Experience the future of chatbots with Chat Droid. We regularly update and improve our platform to provide the best AI chatbot experience.</p>
                </div>
            </div>            
        </div>
    )
}

export default IndexPage
