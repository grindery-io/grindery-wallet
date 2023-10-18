import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import SendPage from "./components/pages/SendPage";
import TokensPage from "./components/pages/TokensPage";
import ContactsPage from "./components/pages/ContactsPage";
import { Box, CircularProgress } from "@mui/material";
import ContactPage from "./components/pages/ContactPage";
import ActivitiesPage from "./components/pages/ActivitiesPage";
import AppsPage from "./components/pages/AppsPage";
import ActivityPage from "./components/pages/ActivityPage";
import RewardPage from "./components/pages/RewardPage";
import RewardsPage from "./components/pages/RewardsPage";
import CommunityPage from "./components/pages/CommunityPage";
import DebugPage from "./components/pages/DebugPage";
import BoardPage from "./components/pages/BoardPage";
import { selectAppStore, useAppSelector } from "./store";

const AppRoutes = () => {
  const { user } = useAppSelector(selectAppStore);

  return user ? (
    <Routes>
      <Route path="/" element={<TokensPage />} />
      <Route path="/contacts" element={<ContactsPage />} />
      <Route path="/contacts/:id" element={<ContactPage />} />
      <Route path="/activities" element={<ActivitiesPage />} />
      <Route path="/activities/:id" element={<ActivityPage />} />
      <Route path="/rewards" element={<RewardsPage />} />
      <Route path="/rewards/:id" element={<RewardPage />} />
      <Route path="/apps" element={<AppsPage />} />
      <Route path="/community" element={<CommunityPage />} />
      <Route path="/send" element={<SendPage />} />
      <Route path="/send/:id" element={<SendPage />} />
      <Route path="/board" element={<BoardPage />} />
      <Route path="/debug" element={<DebugPage />} />
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
      <CircularProgress
        sx={{ color: "var(--tg-theme-button-color, #2481cc)" }}
      />
    </Box>
  );
};

export default AppRoutes;
