import React, { PropsWithChildren } from "react";
import { render } from "@testing-library/react";
import type { RenderOptions } from "@testing-library/react";
import type { PreloadedState } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { AppStore, RootState, setupStore } from "../store";
import { initialState } from "../store/slices/appSlice";
import AppContextProvider from "../context/AppContext";
import { ThemeProvider } from "@mui/material";
import theme from "../theme";
import { BrowserRouter } from "react-router-dom";

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = { app: initialState },
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return (
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Provider store={store}>
            <AppContextProvider>{children}</AppContextProvider>
          </Provider>
        </BrowserRouter>
      </ThemeProvider>
    );
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
