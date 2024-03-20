'use client'

import React, { FormEvent, useState } from 'react'
import { Button } from '../ui/button';
import { PaperPlaneIcon, ReloadIcon } from '@radix-ui/react-icons';
import Textarea from 'react-textarea-autosize'

type ChatPromptProps = {
    chatId: string;
    onSendMessage: (message: string) => void;
    loading: Boolean;
}

const ChatPrompt = ({ chatId, onSendMessage, loading }: ChatPromptProps) => {
    const [prompt, setPrompt] = useState("");

    const sendMessage = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!prompt) return;

        onSendMessage(prompt.trim());
        setPrompt("");
    }

    return (
        <div>
            <div className='sticky bottom-0 w-full'>
                <div className='mx-auto sm:max-w-2xl sm:px-4'>
                    <div className='space-y-4 border-t bg-tertiary px-4 py-2 shadow-lg sm:rounded-t-xl sm:border md:py-4'>
                        <form onSubmit={sendMessage}>
                            <div className="relative flex max-h-60 w-full flex-col overflow-hidden bg-tertiary px-8 sm:rounded-md sm:border sm:px-12">
                                <Textarea                                    
                                    tabIndex={0}                                    
                                    rows={1}
                                    value={prompt}
                                    onChange={e => setPrompt(e.target.value)}
                                    placeholder="Send a message..."
                                    spellCheck={false}
                                    className="min-h-[60px] w-full resize-none bg-transparent px-4 py-[1.3rem] focus-within:outline-none sm:text-sm disabled:cursor-not-allowed"
                                />
                                <div className='absolute right-0 top-4 sm:right-4'>
                                    {loading ? (
                                        <ReloadIcon className='h-6 w-6 animate-spin' />
                                    ) :
                                        <Button size="icon" disabled={!prompt}>
                                            <PaperPlaneIcon />
                                        </Button>
                                    }
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
