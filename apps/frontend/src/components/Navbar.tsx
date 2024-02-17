"use client"
import * as React from "react"

import { Button } from "@/components/ui/button"
import { AngleIcon, GitHubLogoIcon } from "@radix-ui/react-icons"
import { ModeToggle } from "./Toggle"
import Link from "next/link"

const Navbar = () => {
	return (
		<div className="flex items-center justify-between mx-8 py-3 gap-3">
			<Link href="/" className="flex items-center gap-3 text-2xl">
				<AngleIcon className="h-8 w-8" />
				<h3 className="font-bold">chatdroid</h3>
			</Link>
			<div className="flex gap-2">
				<Button variant="outline" size="icon" asChild>
					<Link href="https://github.com/anshRS/chatbot" target="_blank" rel="noopener noreferrer">
						<GitHubLogoIcon className="h-4 w-4" />
					</Link>
				</Button>
				<ModeToggle />
				<Button asChild>
					<Link href="/auth/login">Login</Link>
				</Button>
			</div>

		</div>
	)
}

export default Navbar
