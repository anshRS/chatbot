'use client'

import * as React from "react"

import { Button } from "@/components/ui/button"
import { GitHubLogoIcon, StackIcon } from "@radix-ui/react-icons"
import Link from "next/link"
import { ModeToggle } from "./toggle"
import { RootState } from "@/redux/store"
import { useDispatch, useSelector } from "react-redux"

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { signOut } from "@/redux/slices/auth"
import { toast } from "react-toastify"

const Navbar = () => {
	const { isLoggedIn, user } = useSelector((state: RootState) => state.auth);
	const dispatch = useDispatch();

	const handleLogout = () => {
		dispatch(signOut());

		toast.success("Logout Successful!", {
			position: "top-center",
		});
	}

	return (
		<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">

			<div className="flex items-center justify-between mx-8 py-3 gap-3">
				<Link href="/" className="flex items-center gap-3 text-2xl">
					<StackIcon className="h-8 w-8" />
					<h3 className="font-bold">chatdroid</h3>
				</Link>
				<div className="flex gap-2">
					<Button variant="outline" size="icon" asChild>
						<Link href="https://github.com/anshRS/chatbot" target="_blank" rel="noopener noreferrer">
							<GitHubLogoIcon className="h-4 w-4" />
						</Link>
					</Button>
					<ModeToggle />
					{isLoggedIn ? (
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

					) : (
						<Button asChild>
							<Link href="/auth/login">Login</Link>
						</Button>
					)}


				</div>
			</div>

		</header>
	)
}

export default Navbar
