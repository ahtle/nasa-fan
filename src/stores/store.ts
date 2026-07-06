import { configureStore } from "@reduxjs/toolkit";
import mainReducer from "./main-slice";

export function makeStore() {
  return configureStore({
    reducer: {
      main: mainReducer,
    },
  });
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
