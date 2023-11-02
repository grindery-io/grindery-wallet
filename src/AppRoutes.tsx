import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import SendPage from "./components/pages/SendPage";
import TokensPage from "./components/pages/TokensPage";
import ContactsPage from "./components/pages/ContactsPage";
import ContactPage from "./components/pages/ContactPage";
import AppsPage from "./components/pages/AppsPage";
import ActivityPage from "./components/pages/ActivityPage";
import RewardPage from "./components/pages/RewardPage";
import RewardsPage from "./components/pages/RewardsPage";
import CommunityPage from "./components/pages/CommunityPage";
import DebugPage from "./components/pages/DebugPage";
import BoardPage from "./components/pages/BoardPage";
import { selectAppStore, useAppSelector } from "./store";
import WelcomePage from "./components/pages/WelcomePage";
import StatsPage from "./components/pages/StatsPage";

const AppRoutes = () => {
  const { user } = useAppSelector(selectAppStore);

  return user ? (
    <Routes>
      <Route path="/tokens" element={<TokensPage />} />
      <Route path="/nfts" element={<TokensPage />} />
      <Route path="/activities" element={<TokensPage />} />
      <Route path="/contacts" element={<ContactsPage />} />
      <Route path="/contacts/:id" element={<ContactPage />} />
      <Route path="/activities/:id" element={<ActivityPage />} />
      <Route path="/rewards" element={<RewardsPage />} />
      <Route path="/rewards/:id" element={<RewardPage />} />
      <Route path="/apps" element={<AppsPage />} />
      <Route path="/community" element={<CommunityPage />} />
      <Route path="/send" element={<SendPage />} />
      <Route path="/board" element={<BoardPage />} />
      <Route path="/debug" element={<DebugPage />} />
      <Route path="/debug/stats" element={<StatsPage />} />
      <Route path="*" element={<Navigate to="/tokens" replace />} />
    </Routes>
  ) : (
    <WelcomePage />
  );
};

export default AppRoutes;
