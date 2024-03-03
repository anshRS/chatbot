import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Chat {
    id: string;
    messages: IMessage[];
}

interface ChatState {
    chatHistory: Chat[];
}

const initialState: ChatState = {
    chatHistory: [
        {
            id: "1",
            messages: [
                {
                    id: "1",
                    text: "What is tailwindcss?",
                    sender: {
                        userId: '123',         
                        email: 'john@test.com',               
                        fullName: 'John Doe',
                        profileImage: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
                    },
                    timestamp: '2024-03-02T12:00:00',
                },
                {
                    id: "2",
                    text: "Tailwind CSS is a utility-first CSS framework that provides a set of pre-designed classes to quickly build modern and responsive user interfaces. Unlike traditional CSS frameworks like Bootstrap or Foundation, which offer pre-built components, Tailwind CSS focuses on providing low-level utility classes that you can use to style your HTML elements. With Tailwind CSS, you can create complex layouts and designs by combining these utility classes directly in your HTML. This approach offers more flexibility and customization options compared to traditional CSS frameworks.",
                    sender: {
                        userId: '222',
                        email: 'chatbot@test.com',
                        fullName: 'Chat Bot',
                        profileImage: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
                    },
                    timestamp: '2024-03-02T12:01:00',
                },
                {
                    id: "3",
                    text: "What is Django?",
                    sender: {
                        userId: '123',   
                        email: 'john@test.com',                    
                        fullName: 'John Doe',
                        profileImage: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
                    },
                    timestamp: '2024-03-02T12:00:00',
                },
                {
                    id: "4",
                    text: "Django is a high-level Python web framework that encourages rapid development and clean, pragmatic design. It's designed to help developers build web applications quickly, with a focus on reusability, extensibility, and security.",
                    sender: {
                        userId: '222',  
                        email: 'chatbot@test.com',                      
                        fullName: 'Chat Bot',
                        profileImage: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
                    },
                    timestamp: '2024-03-02T12:01:00',
                },
            ],
        },
    ],
};

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        addChat: (state, action: PayloadAction<Chat>) => {
            state.chatHistory.push(action.payload);
        },
        deleteChat: (state, action) => {
            state.chatHistory = state.chatHistory.filter(
                (chat) => chat.id !== action.payload
            );
        },
    },
});

export const { addChat, deleteChat } = chatSlice.actions;
export default chatSlice.reducer;
