import React, { useEffect } from "react";
import { ThemeProvider, CircularProgress } from "grindery-ui";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppContextProvider from "./context/AppContext";
import HomePage from "./components/pages/HomePage";
import GrinderyLoginProvider from "use-grindery-login";
import SendPage from "./components/pages/SendPage";
import AppHeader from "./components/shared/AppHeader";

function App() {
  return (
    <ThemeProvider>
      <GrinderyLoginProvider
        loader={
          <div style={{ textAlign: "center", margin: "80px auto" }}>
            <CircularProgress />
          </div>
        }
        disconnectRedirectUrl="https://www.grindery.io/sign-out?sidebar_opened=1"
      >
        <AppContextProvider>
          <BrowserRouter>
            <AppHeader />
            <div style={{ padding: "86px 20px 40px" }}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/send" element={<SendPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>
          </BrowserRouter>
        </AppContextProvider>
      </GrinderyLoginProvider>
    </ThemeProvider>
  );
}

export default App;
