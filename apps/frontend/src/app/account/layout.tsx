import Navbar from '@/components/common/navbar'
import React from 'react'

const AccountLayout = ({
    children,
}: {
    children: React.ReactNode
}) => {
    return (
        <div className='flex flex-col h-screen'>
            <Navbar/>
            {children}
        </div>
    )
}

export default AccountLayout
