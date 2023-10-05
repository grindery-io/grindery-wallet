import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import AppContextProvider from "./context/AppContext";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import Container from "./components/shared/Container";
import AppRoutes from "./AppRoutes";

declare global {
  interface Window {
    Telegram?: any;
  }
}

window.Telegram = window.Telegram?.WebApp?.initData
  ? window.Telegram
  : {
      WebApp: {
        initData:
          process.env.REACT_APP_DEV_KEY ||
          window.location.href?.split("?")?.[1] ||
          "",
      },
    };

console.log("theme", window.Telegram?.WebApp?.themeParams);

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
      document.body.style.setProperty(
        "--gr-theme-divider-color",
        "var(--tg-theme-secondary-bg-color)"
      );
    } else {
      document.body.style.setProperty("--gr-theme-divider-color", "#ccc");
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <AppContextProvider>
        <BrowserRouter>
          <Container>
            <AppRoutes />
          </Container>
        </BrowserRouter>
      </AppContextProvider>
    </ThemeProvider>
  );
}

export default App;
