import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
    title: "ChatDroid | Authentication",
};

const AuthLayout = ({
    children,
}: {
    children: React.ReactNode
}) => {
    return (
        <section>
            <div className='m-8 border rounded-xl overflow-hidden shadow-xl'>
                <div className='h-screen flex items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0'>
                    <div className='hidden lg:flex bg-zinc-900 h-full items-center justify-center p-5'>
                        <blockquote className='text-white w-[500px]'>
                            <p className='text-lg'>"Experience the future of communication with our chatbot. Whether you need assistance, information, or just a friendly chat, our chatbot is always here for you."</p>

                        </blockquote>
                    </div>
                    <div className=''>
                        {children}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AuthLayout
