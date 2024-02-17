"use client"
import * as React from "react"

import { Button } from "@/components/ui/button"
import { AngleIcon, GitHubLogoIcon } from "@radix-ui/react-icons"
import { ModeToggle } from "./Toggle"

const Navbar = () => {
    return (
        <div className="flex items-center justify-between mx-8 my-5 gap-3">
			<div className="flex items-center gap-3 text-2xl">
				<AngleIcon className="h-8 w-8" />
				<h3 className="font-bold">chatdroid</h3>
			</div>
			<div className="flex gap-2">
				<Button variant="outline" size="icon">
					<GitHubLogoIcon className="h-4 w-4" />
				</Button>
				<ModeToggle />
				<Button>
					Login
				</Button>
			</div>

		</div>
    )
}

export default Navbar
