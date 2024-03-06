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
}

interface UserPayload {
    user: IUser;
}

const initialState: AuthState = {
    isLoggedIn: false,
    token: "",
    user: null    
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logIn: (state, action: PayloadAction<LoginPayload>) => {
            const { isLoggedIn, token } = action.payload;
            state.isLoggedIn = isLoggedIn;
            state.token = token;
        },
        setUserInfo: (state, action: PayloadAction<UserPayload>) => {
            state.user = action.payload.user;
        },
        signOut: (state) => {
            state.isLoggedIn = false;
            state.token = "";
            state.user = null
        }
    }
})

export const { logIn, signOut, setUserInfo } = authSlice.actions
export default authSlice.reducer