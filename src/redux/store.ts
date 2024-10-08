import { configureStore } from "@reduxjs/toolkit";

import { bcaApiSlice } from "./api/bca-backend/bcaSlice";
import { themeSlice } from "./features/theme/themeSlice";
import { loginSlice } from "./features/login/loginSlice";

export const store = configureStore({
  reducer: {
    theme: themeSlice.reducer,
    login: loginSlice.reducer,
    [bcaApiSlice.reducerPath]: bcaApiSlice.reducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(bcaApiSlice.middleware)
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
