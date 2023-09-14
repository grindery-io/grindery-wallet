import React, { useEffect } from "react";
import { ThemeProvider } from "grindery-ui";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppContextProvider from "./context/AppContext";
import HomePage from "./components/pages/HomePage";
import SendPage from "./components/pages/SendPage";
import AppHeader from "./components/shared/AppHeader";

declare global {
  interface Window {
    Telegram?: any;
  }
}

function App() {
  return (
    <ThemeProvider>
      
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
      
    </ThemeProvider>
  );
}

export default App;
