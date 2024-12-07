import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./data-slice";

export const store = configureStore({
  reducer: {
    movieData: dataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
