'use client'

import ChatArea from "@/components/chat/chatarea"
import ChatPrompt from "@/components/chat/chatprompt"
import { addMessage, setChatTitleFromMessage, setMessages } from "@/redux/slices/chat"
import { RootState } from "@/redux/store"
import axios from "@/utils/axios"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

type ChatPageProps = {
    params: {
        id: string
    }
}

const ChatPage = ({ params: { id } }: ChatPageProps) => {

    const [ws, setWs] = useState<WebSocket | null>(null);    
    const { token } = useSelector((state: RootState) => state.auth);
    const [loading, setLoading] = useState(false)
    const [chunks, setChunks] = useState<string>('');
    const dispatch = useDispatch();

    useEffect(() => {        
        const fetchMessages = async () => {
            try {
                const response = await axios.get(`/chat/${id}/messages/`, {
                    headers: {
                        Authorization: `JWT ${token}`,
                    },
                });    
                dispatch(setMessages(response.data));

            } catch (error) {
                console.log('Error fetching messages:', error)
            }
        }

        fetchMessages();

        const newWs = new WebSocket(`ws://localhost:8000/ws/chat/${id}/?token=${token}`);
        setWs(newWs);

        return () => {
            newWs.close();
        }
    }, [])

    const sendMessage = (message: string) => {
        if (ws?.readyState === WebSocket.OPEN) {
            setLoading(true)
            ws.send(JSON.stringify({ message }));               
        }
    };

    useEffect(() => {
        if (!ws) return;

        ws.onmessage = (event) => {
            const res = JSON.parse(event.data);

            if (res.user_data) {                              
                dispatch(addMessage(res.user_data));    
                dispatch(setChatTitleFromMessage({chatId: parseInt(id, 10), title: res.title}));            

            }
            if (res.llm_response) {                
                dispatch(addMessage(res.llm_response));                
                setLoading(false);
                setChunks('')
            }

            if (res.data_stream) {
                const newChunk = res.data_stream;
                setChunks(prevChunks => prevChunks + newChunk);
            }
        };

        return () => {
            ws.onmessage = null;
        }
    }, [ws])

    return (
        <div className="flex flex-col h-full overflow-hidden">           
            <ChatArea chatId={id} chunks={chunks} />
            <ChatPrompt chatId={id} onSendMessage={sendMessage} loading={loading} />
        </div>
    )
}

export default ChatPage
