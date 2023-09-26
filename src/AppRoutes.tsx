import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import SendPage from "./components/pages/SendPage";
import ConnectTelegramPage from "./components/pages/ConnectTelegramPage";
import TokensPage from "./components/pages/TokensPage";
import ContactsPage from "./components/pages/ContactsPage";
import NFTsPage from "./components/pages/NFTsPage";
import useAppContext from "./hooks/useAppContext";
import { Box, CircularProgress } from "@mui/material";
import ContactPage from "./components/pages/ContactPage";
import ActivitiesPage from "./components/pages/ActivitiesPage";
import AppsPage from "./components/pages/AppsPage";

const AppRoutes = () => {
  const {
    state: { user },
  } = useAppContext();

  return user ? (
    <Routes>
      <Route path="/" element={<TokensPage />} />
      <Route path="/contacts" element={<ContactsPage />} />
      <Route path="/contacts/:id" element={<ContactPage />} />
      <Route path="/nfts" element={<NFTsPage />} />
      <Route path="/activities/:type/:status" element={<ActivitiesPage />} />
      <Route
        path="/activities"
        element={<Navigate to="/activities/transfers/all" replace />}
      />
      <Route
        path="/activities/:type"
        element={<Navigate to="/activities/transfers/all" replace />}
      />
      <Route path="/apps" element={<AppsPage />} />
      <Route path="/send" element={<SendPage />} />
      <Route path="/send/:id" element={<SendPage />} />
      <Route path="/connect/telegram" element={<ConnectTelegramPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  ) : (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <CircularProgress sx={{ color: "#0B0C0E" }} />
    </Box>
  );
};

export default AppRoutes;
