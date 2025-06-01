import { configureStore } from '@reduxjs/toolkit'
import { testLoginSlice } from './features/login/testLoginSlice'

export const testStore = configureStore({
  reducer: {
    login: testLoginSlice.reducer,
  },
})

export type AppDispatch = typeof testStore.dispatch
export type RootState = ReturnType<typeof testStore.getState>
