import { configureStore } from '@reduxjs/toolkit'
import { loginSlice } from './features/login/loginSlice'
import { themeSlice } from './features/theme/themeSlice'

export const store = configureStore({
  reducer: {
    theme: themeSlice.reducer,
    login: loginSlice.reducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
