import { createSlice } from "@reduxjs/toolkit";

interface AppState {
    chatsidebar: {
        open: boolean
    }
} 

const initialState: AppState = {
    chatsidebar: {
        open: false,
    }
}

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        toggleChatSideBar: (state) => {
            state.chatsidebar.open = !state.chatsidebar.open
        },
    }
})

export const { toggleChatSideBar } = appSlice.actions
export default appSlice.reducer