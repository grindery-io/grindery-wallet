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
import { setAppStyles } from "./utils/setAppStyles";
import { expandApp } from "./utils/expandApp";

function App() {
  useEffect(() => {
    expandApp();
    setAppStyles();
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
