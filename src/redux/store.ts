import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counter/counterSlice";
import { dogsApiSlice } from "./features/dogs/dogs-api-slice";
import { themeSlice } from "./features/theme/theme-slice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    theme: themeSlice.reducer,
    [dogsApiSlice.reducerPath]: dogsApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(dogsApiSlice.middleware)
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
