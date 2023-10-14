import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider as StoreProvider } from "react-redux";
import AppContextProvider from "./context/AppContext";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import Container from "./components/shared/Container";
import AppRoutes from "./AppRoutes";
import LeaderboardPage from "./components/pages/LeaderboardPage";
import { store } from "./store";
import ConnectTelegramPage from "./components/pages/ConnectTelegramPage";

declare global {
  interface Window {
    Telegram?: any;
    telegram?: {
      TelegramClient: any;
      sessions: {
        StringSession: any;
      };
    };
  }
}

window.Telegram = window.Telegram?.WebApp?.initData
  ? window.Telegram
  : {
      WebApp: {
        initData:
          window.location.href?.split("?")?.[1] ||
          process.env.REACT_APP_DEV_KEY ||
          "",
      },
    };

function App() {
  useEffect(() => {
    if (typeof window.Telegram?.WebApp?.expand !== "undefined") {
      window.Telegram.WebApp.expand();
    }
    if (
      (window.Telegram?.WebApp?.colorScheme &&
        window.Telegram?.WebApp?.colorScheme === "dark") ||
      process.env.REACT_APP_THEME === "dark"
    ) {
      document.body.style.setProperty("--gr-theme-divider-color", "#393D47");
      document.body.style.setProperty(
        "--gr-theme-button-shadow-color",
        "#344564"
      );
      document.body.style.setProperty(
        "--tg-theme-accent-pale",
        "rgba(98, 188, 249, 0.15)"
      );
    } else {
      document.body.style.setProperty("--gr-theme-divider-color", "#E3E3E8");
      document.body.style.setProperty(
        "--gr-theme-button-shadow-color",
        "#aab8d3"
      );
      document.body.style.setProperty(
        "--tg-theme-accent-pale",
        "rgba(36, 129, 204, 0.1)"
      );
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/leaderboard" element={<LeaderboardPage />} />
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
