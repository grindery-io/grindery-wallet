import React, { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppContextProvider from "./context/AppContext";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import Container from "./components/shared/Container";
import SendPage from "./components/pages/SendPage";
import ConnectTelegramPage from "./components/pages/ConnectTelegramPage";
import TokensPage from "./components/pages/TokensPage";
import ContactsPage from "./components/pages/ContactsPage";
import NFTsPage from "./components/pages/NFTsPage";
import RewardsPage from "./components/pages/RewardsPage";
import ActivityPage from "./components/pages/ActivityPage";

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
            <Routes>
              <Route path="/" element={<TokensPage />} />
              <Route path="/contacts" element={<ContactsPage />} />
              <Route path="/nfts" element={<NFTsPage />} />
              <Route path="/rewards" element={<RewardsPage />} />
              <Route path="/activity" element={<ActivityPage />} />
              <Route path="/send" element={<SendPage />} />
              <Route
                path="/connect/telegram"
                element={<ConnectTelegramPage />}
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Container>
        </BrowserRouter>
      </AppContextProvider>
    </ThemeProvider>
  );
}

export default App;
