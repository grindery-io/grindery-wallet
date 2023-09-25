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
            <AppRoutes />
          </Container>
        </BrowserRouter>
      </AppContextProvider>
    </ThemeProvider>
  );
}

export default App;
