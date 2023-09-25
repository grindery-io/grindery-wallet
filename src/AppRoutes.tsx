import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import SendPage from "./components/pages/SendPage";
import ConnectTelegramPage from "./components/pages/ConnectTelegramPage";
import TokensPage from "./components/pages/TokensPage";
import ContactsPage from "./components/pages/ContactsPage";
import NFTsPage from "./components/pages/NFTsPage";
import RewardsPage from "./components/pages/RewardsPage";
import ActivityPage from "./components/pages/ActivityPage";
import useAppContext from "./hooks/useAppContext";
import { Box, CircularProgress } from "@mui/material";

const AppRoutes = () => {
  const {
    state: { user },
  } = useAppContext();

  return user ? (
    <Routes>
      <Route path="/" element={<TokensPage />} />
      <Route path="/contacts" element={<ContactsPage />} />
      <Route path="/nfts" element={<NFTsPage />} />
      <Route path="/rewards" element={<RewardsPage />} />
      <Route path="/activity" element={<ActivityPage />} />
      <Route path="/send" element={<SendPage />} />
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
