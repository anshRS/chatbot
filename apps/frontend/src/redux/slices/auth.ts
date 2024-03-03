import { createSlice, PayloadAction  } from '@reduxjs/toolkit'

// Define types for the state
interface AuthState {
    isLoggedIn: boolean;
    token: string;
    user: IUser | null;
}

// Define types for the actions
interface LoginPayload {
    isLoggedIn: boolean;
    token: string;
    user: IUser;
}

// const initialState: AuthState = {
//     isLoggedIn: false,
//     token: "",
//     user: null,
// }

const initialState: AuthState = {
    isLoggedIn: false,
    token: "",
    user: {
        userId: '1',
        fullName: 'John Doe',
        email: 'john@test.com',
        profileImage: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
    },
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logIn: (state, action: PayloadAction<LoginPayload>) => {
            const { isLoggedIn, token, user } = action.payload;
            state.isLoggedIn = isLoggedIn;
            state.token = token;
            state.user = user;
        },
        signOut: (state) => {
            state.isLoggedIn = false;
            state.token = "";
            state.user = null
        }
    }
})

export const { logIn, signOut } = authSlice.actions
export default authSlice.reducer