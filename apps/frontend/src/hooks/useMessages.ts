import { RootState } from '@/redux/store';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

interface Chat {
    id: string;
    messages: IMessage[];
}

export function useMessages(chatId: string) {
    const [messages, setMessages] = useState<IMessage[]>([]);
    
    const chatHistory = useSelector((state: RootState) => state.chat.chatHistory);

    useEffect(() => {
        const chat = chatHistory.find((chat: Chat) => chat.id === chatId);
        if (chat) {
            setMessages(chat.messages);
        } else {
            setMessages([]);
        }
    }, [chatId, chatHistory]);

    return messages;
}
