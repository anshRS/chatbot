import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ChatState {
    chats: IChat[];
    messages: IMessage[];
    selectedMode: string;
}

const initialState: ChatState = {
    chats: [],
    messages: [],
    selectedMode: 'chattergeist',
}

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        setChats: (state, action: PayloadAction<IChat[]>) => {
            state.chats = action.payload;
        },

        addChat: (state, action: PayloadAction<IChat>) => {
            state.chats.push(action.payload);
        },

        deleteChat: (state, action: PayloadAction<number>) => {
            state.chats = state.chats.filter(chat => chat.id !== action.payload);
        },

        setMessages: (state, action: PayloadAction<IMessage[]>) => {
            state.messages = action.payload;
        },

        addMessage: (state, action: PayloadAction<IMessage>) => {
            state.messages.push(action.payload);
        },

        // setChatTitleFromMessage: (state, action: PayloadAction<number>) => {
        //     const chatId = action.payload;
        //     const chat = state.chats.find(chat => chat.id === chatId);
        //     if (chat) {
        //         const messages = state.messages.filter(message => message.chat === chatId);
        //         if (messages.length > 0) {
        //             chat.title = messages[0].content;
        //         }
        //     }
        // },

        setChatTitleFromMessage: (state, action: PayloadAction<{chatId: number, title: string}>) => {
            const {chatId, title} = action.payload;
            const chat = state.chats.find(chat => chat.id === chatId);
            if (chat) { 
                    chat.title = title;                
            }
        },

        resetChatHistory: (state) => {
            state.chats = [];
            state.messages = [];
        },

        setSelectedMode: (state, action: PayloadAction<{type: string}>) => {
            state.selectedMode = action.payload.type;
        }  
    }
})

export const { setChats, addChat, deleteChat, setMessages, addMessage, resetChatHistory, setChatTitleFromMessage, setSelectedMode } = chatSlice.actions;
export default chatSlice.reducer;
