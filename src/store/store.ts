import { PreloadedState, configureStore } from "@reduxjs/toolkit";
import appReducer from "./slices/appSlice";

export const store = configureStore({
  reducer: {
    app: appReducer,
  },
});

export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: { app: appReducer },
    preloadedState,
  });
}

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = typeof store.dispatch;
