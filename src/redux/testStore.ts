import { configureStore } from '@reduxjs/toolkit'
import { testLoginSlice } from './features/login/testLoginSlice'
import { testThemeSlice } from './features/theme/testThemeSlice'

export const testStore = configureStore({
  reducer: {
    theme: testThemeSlice.reducer,
    login: testLoginSlice.reducer,
  },
})

export type AppDispatch = typeof testStore.dispatch
export type RootState = ReturnType<typeof testStore.getState>
