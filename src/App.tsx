import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider as StoreProvider } from "react-redux";
import { ThemeProvider } from "@mui/material";

import { store } from "store";
import { expandApp, setAppStyles } from "utils";
import theme from "theme";

import AppRoutes from "AppRoutes";
import Container from "components/shared/Container";
import AppContextProvider from "context/AppContext";

import { ConnectTelegramPage } from "components/pages";

function App() {
  useEffect(() => {
    expandApp();
    setAppStyles();
    const colorSchemeDarkMedia = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );

    colorSchemeDarkMedia.onchange = () => {
      setAppStyles();
    };

    return () => {
      colorSchemeDarkMedia.onchange = null;
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/connect/telegram" element={<ConnectTelegramPage />} />
          <Route
            path="*"
            element={
              <StoreProvider store={store}>
                <AppContextProvider>
                  <Container>
                    <AppRoutes />
                  </Container>
                </AppContextProvider>
              </StoreProvider>
            }
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
