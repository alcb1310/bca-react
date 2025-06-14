import { configureStore } from '@reduxjs/toolkit'

import { bcaApiSlice } from './api/bca-backend/bcaSlice'
import { testLoginSlice } from './features/login/testLoginSlice'
import { testThemeSlice } from './features/theme/testThemeSlice'

export const testStore = configureStore({
  reducer: {
    theme: testThemeSlice.reducer,
    login: testLoginSlice.reducer,
    [bcaApiSlice.reducerPath]: bcaApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(bcaApiSlice.middleware)
  },
})

export type AppDispatch = typeof testStore.dispatch
export type RootState = ReturnType<typeof testStore.getState>
