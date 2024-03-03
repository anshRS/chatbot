
import * as React from "react"

import { Button } from "@/components/ui/button"
import { GitHubLogoIcon, HamburgerMenuIcon, StackIcon } from "@radix-ui/react-icons"
import Link from "next/link"
import { ModeToggle } from "./toggle"

const Navbar = () => {
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
					<Button asChild>
						<Link href="/auth/login">Login</Link>
					</Button>
				</div>
			</div>

		</header>
	)
}

export default Navbar
