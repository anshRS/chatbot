import ChatArea from "@/components/chat/chatarea"
import ChatPrompt from "@/components/chat/chatprompt"

type ChatPageProps = {
    params: {
        id: string
    }
}

const ChatPage = ({params: { id }} : ChatPageProps) => {
    
    return (
        <div className="flex flex-col h-full overflow-hidden">
            <ChatArea chatId={id}/>
            <ChatPrompt chatId={id}/>
        </div>
    )
}

export default ChatPage
