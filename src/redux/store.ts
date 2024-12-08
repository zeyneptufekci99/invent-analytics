import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./data-slice";
import detailDataReducer from "./detail-slice";
export const store = configureStore({
  reducer: {
    movieData: dataReducer,
    detailData: detailDataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
