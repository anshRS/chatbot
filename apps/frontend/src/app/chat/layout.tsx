import Header from '@/components/chat/header'
import Sidebar from '@/components/common/sidebar'
import React from 'react'

const ChatAreaLayout = ({
    children,
}: {
    children: React.ReactNode
}) => {
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
