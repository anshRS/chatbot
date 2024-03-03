import { combineReducers } from "@reduxjs/toolkit";
import appReducer from './slices/app';
import chatReducer from './slices/chat';
import authReducer from './slices/auth';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';

const createNoopStorage = () => {
    return {
        getItem(_key: any) {
            return Promise.resolve(null);
        },
        setItem(_key: any, value: any) {
            return Promise.resolve(value);
        },
        removeItem(_key: any) {
            return Promise.resolve();
        },
    };
};

const storage = 
    typeof window !== 'undefined' 
        ? createWebStorage('local') 
        : createNoopStorage();

const rootPersistConfig = {
    key: 'root',
    storage,
    keyPrefix: 'redux-',
};

const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    chat: chatReducer,
});

export { rootPersistConfig, rootReducer };
