'use client'

import React from 'react'

import { GitHubLogoIcon, HamburgerMenuIcon } from '@radix-ui/react-icons'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from 'next/link'
import { ModeToggle } from '../common/toggle'
import { useDispatch, useSelector } from 'react-redux'
import { toggleChatSideBar } from '@/redux/slices/app'
import { Button } from '../ui/button'
import { RootState } from '@/redux/store'
import { toast } from 'react-toastify'
import { signOut } from '@/redux/slices/auth'

const Header = () => {
    const user = useSelector((state: RootState) => state.auth.user)
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(signOut());

        toast.success("Logout Successful!", {
            position: "top-center",
        });
    }

    return (
        <div className='sticky top-0 z-30 border-b bg-tertiary/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 w-full'>
            <div className='flex px-5 py-3 items-center justify-between bg-tertiary'>
                <div className='flex gap-3'>
                    <Button variant="outline" size="icon" className='md:hidden' onClick={() => {
                        dispatch(toggleChatSideBar())
                    }}>
                        <HamburgerMenuIcon />
                    </Button>
                    <h1 className='text-2xl font-medium'>Chat Droid</h1>
                </div>

                <div className="flex gap-2">

                    <Button variant="outline" size="icon" asChild>
                        <Link href="https://github.com/anshRS/chatbot" target="_blank" rel="noopener noreferrer">
                            <GitHubLogoIcon className="h-4 w-4" />
                        </Link>
                    </Button>

                    <ModeToggle />

                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Avatar>
                                {user && <AvatarImage src={user.profileImage} />}
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>

                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='end'>
                            {user && <DropdownMenuLabel>👋 Hey, {user.full_name.split(" ")[0]}</DropdownMenuLabel>}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Profile</DropdownMenuItem>
                            <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </div>
    )
}

export default Header
