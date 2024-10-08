import { configureStore } from "@reduxjs/toolkit";

import { dogsApiSlice } from "./features/dogs/dogs-api-slice";
import { themeSlice } from "./features/theme/themeSlice";
import { loginSlice } from "./features/login/loginSlice";

export const store = configureStore({
  reducer: {
    theme: themeSlice.reducer,
    login: loginSlice.reducer,
    [dogsApiSlice.reducerPath]: dogsApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(dogsApiSlice.middleware)
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
