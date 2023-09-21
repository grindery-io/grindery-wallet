import React, { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppContextProvider from "./context/AppContext";
import HomePage from "./components/pages/HomePage";
import AppHeader from "./components/shared/AppHeader";
import ConnectTelegram from "./components/pages/ConnectTelegram";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import Container from "./components/shared/Container";
import SendPage from "./components/pages/SendPage";

declare global {
  interface Window {
    Telegram?: any;
  }
}

window.Telegram = window.Telegram?.WebApp?.initData
  ? window.Telegram
  : {
      WebApp: { initData: window.location.href?.split("?")?.[1] || "" },
    };

function App() {
  useEffect(() => {
    if (typeof window.Telegram?.WebApp?.expand !== "undefined") {
      window.Telegram.WebApp.expand();
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <AppContextProvider>
        <BrowserRouter>
          <Container>
            <AppHeader />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/send" element={<SendPage />} />
              <Route path="/connect/telegram" element={<ConnectTelegram />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Container>
        </BrowserRouter>
      </AppContextProvider>
    </ThemeProvider>
  );
}

export default App;
