import { configureStore } from '@reduxjs/toolkit'
import loginReducer from './login/loginSlice'
import { apiSlice } from '../api/api/bca-api-slice'

export const store = configureStore({
    reducer: {
        login: loginReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },

    middleware(getDefaultMiddleware) {
        return getDefaultMiddleware().concat(apiSlice.middleware)
    },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
