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
import { STORAGE_KEYS } from "./constants";

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
          process.env.REACT_APP_DEV_KEY ||
          window.location.href?.split("?")?.[1] ||
          localStorage.getItem(STORAGE_KEYS.INIT_DATA) ||
          "",
      },
    };

if (window.Telegram.WebApp.initData) {
  localStorage.setItem(STORAGE_KEYS.INIT_DATA, window.Telegram.WebApp.initData);
}

function App() {
  useEffect(() => {
    if (typeof window.Telegram?.WebApp?.expand !== "undefined") {
      window.Telegram.WebApp.expand();
    }
    if (
      (window.Telegram?.WebApp?.colorScheme &&
        window.Telegram?.WebApp?.colorScheme === "dark") ||
      process.env.REACT_APP_THEME === "dark" ||
      window.location.href?.split("?")?.[1] === "theme=dark"
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

    if (
      !window.Telegram?.WebApp?.colorScheme &&
      window.location.href?.split("?")?.[1] === "theme=dark"
    ) {
      document.body.style.setProperty("--tg-theme-bg-color", "#18222d");
      document.body.style.setProperty("--tg-theme-button-color", "#2ea6ff");
      document.body.style.setProperty(
        "--tg-theme-button-text-color",
        "#ffffff"
      );
      document.body.style.setProperty("--tg-theme-hint-color", "#b1c3d5");
      document.body.style.setProperty("--tg-theme-link-color", "#62bcf9");
      document.body.style.setProperty(
        "--tg-theme-secondary-bg-color",
        "#131415"
      );
      document.body.style.setProperty("--tg-theme-text-color", "#ffffff");
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
