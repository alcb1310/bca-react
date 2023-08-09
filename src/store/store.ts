import { configureStore } from '@reduxjs/toolkit'
import { apiSlice as loginApiSlice } from "../api/login/bca-api-slice"
import loginReducer from './login/loginSlice'

export const store = configureStore({
    reducer: {
        login: loginReducer,
        [loginApiSlice.reducerPath]: loginApiSlice.reducer,
    },

    middleware(getDefaultMiddleware) {
        return getDefaultMiddleware().concat(loginApiSlice.middleware)
    },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
