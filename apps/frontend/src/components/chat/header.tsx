'use client'

import React from 'react'
import { CheckIcon, GitHubLogoIcon, HamburgerMenuIcon } from '@radix-ui/react-icons'
import { CaretDown, Cherries, Lightning } from '@phosphor-icons/react'

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
import { resetChatHistory, setSelectedMode } from '@/redux/slices/chat'

const Header = () => {
    const user = useSelector((state: RootState) => state.auth.user)
    const selectedMode  = useSelector((state: RootState) => state.chat.selectedMode)
    const dispatch = useDispatch();

    const handleItemClick = (value: string) => {
        dispatch(setSelectedMode({
            type: value
        }));
    };

    const handleLogout = () => {
        dispatch(signOut());
        dispatch(resetChatHistory());

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
                    <DropdownMenu>
                        <DropdownMenuTrigger className='text-xl font-medium capitalize flex items-center gap-2'>
                            {selectedMode}
                            <CaretDown size={16}/>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className='min-w-[340px] max-w-xs p-3' align='start'>
                            <DropdownMenuLabel>Mode</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onSelect={() => handleItemClick('chattergeist')}>
                                <div className='flex items-center gap-3 cursor-pointer'>
                                    <Lightning size={32}/>
                                    <div>
                                        <h3 className='text-base'>Chattergeist</h3>
                                        <p className='font-extralight'>A general chatbot for engaging conversations on various topics.</p>
                                    </div>
                                    {selectedMode === 'chattergeist' && <CheckIcon className="h-8 w-8"/>}
                                </div>
                            </DropdownMenuItem>
                            <DropdownMenuItem onSelect={() => handleItemClick('noura')}>
                                <div className='flex items-center gap-3 cursor-pointer'>
                                    <Cherries size={32} />
                                    <div>
                                        <h3 className='text-base'>Noura</h3>
                                        <p className='font-extralight'>A nutrition-focused chatbot using the RAG pipeline for personalized advice.</p>
                                    </div>
                                    {selectedMode === 'noura' && <CheckIcon className="h-8 w-8"/>}
                                </div>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
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
