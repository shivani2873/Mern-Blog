import {configureStore,combineReducers} from '@reduxjs/toolkit'
import userReducer from './user/userSlice'
import themeReducer from './theme/themeSlice'
import {persistReducer,persistStore} from 'redux-persist/es/persistReducer';
import { version } from 'mongoose';
import {storage} from 'redux-persist/lib/storage'

const rootReducer=combineReducers({
    user:userReducer,
    theme:themeReducer,
});

//this will store the user information
const persistConfig={
    key:'root',
    storage,
    version:1,
}
const persistReducer=persistReducer(persistConfig,rootReducer);

export const store=configureStore({
    // reducer:{ user:userReducer, },
    reducer:persistReducer,
    //below one is used to solve the error due to redux-toolkit
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware({ serializableCheck:false}),
})
export const persistor=persistStore(store);