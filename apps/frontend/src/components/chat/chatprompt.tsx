'use client'

import React, { FormEvent, useState } from 'react'
import { Button } from '../ui/button';
import { PaperPlaneIcon } from '@radix-ui/react-icons';
import Textarea from 'react-textarea-autosize'

type ChatPromptProps = {
    chatId: string;
}


const ChatPrompt = ({ chatId }: ChatPromptProps) => {
    const [prompt, setPrompt] = useState("");

    const sendMessage = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if(!prompt) return;

        const input = prompt.trim();
        setPrompt("");

        // const message: IMessage = {
        // }

        // make the api call to get reply of prompt
    }

    return (
        <div>
            <div className='sticky bottom-0 w-full'>
                <div className='mx-auto sm:max-w-2xl sm:px-4'>
                    <div className='space-y-4 border-t bg-tertiary px-4 py-2 shadow-lg sm:rounded-t-xl sm:border md:py-4'>
                        <form onSubmit={sendMessage}>
                            <div className="relative flex max-h-60 w-full flex-col overflow-hidden bg-tertiary px-8 sm:rounded-md sm:border sm:px-12">
                                <Textarea
                                    // ref={inputRef}
                                    tabIndex={0}
                                    // onKeyDown={onKeyDown}
                                    rows={1}
                                    value={prompt}
                                    onChange={e => setPrompt(e.target.value)}
                                    placeholder="Send a message..."
                                    spellCheck={false}
                                    className="min-h-[60px] w-full resize-none bg-transparent px-4 py-[1.3rem] focus-within:outline-none sm:text-sm disabled:cursor-not-allowed"
                                />
                                <div className='absolute right-0 top-4 sm:right-4'>
                                    <Button size="icon" disabled={!prompt}>
                                        <PaperPlaneIcon />
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </div>

                </div>


            </div>
        </div>
    )
}

export default ChatPrompt
