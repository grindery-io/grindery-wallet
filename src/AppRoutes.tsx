import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { selectAppStore, useAppSelector } from "store";

import {
  ActivityPage,
  AppsPage,
  BridgePage,
  CommunityPage,
  ContactPage,
  ContactsPage,
  DebugPage,
  RewardPage,
  RewardsPage,
  SendPage,
  StatsPage,
  SwapPage,
  TokenPage,
  TokensImportPage,
  TokensPage,
  WelcomePage,
} from "components/pages";

const AppRoutes = () => {
  const {
    user,
    debug: { enabled, features },
  } = useAppSelector(selectAppStore);

  return user ? (
    <Routes>
      <Route path="/tokens" element={<TokensPage />} />
      <Route path="/tokens/import" element={<TokensImportPage />} />
      <Route path="/tokens/:id" element={<TokenPage />} />
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
      <Route path="/debug" element={<DebugPage />} />
      {enabled && <Route path="/debug/stats" element={<StatsPage />} />}
      {enabled && features?.SWAP && (
        <Route path="/swap" element={<SwapPage />} />
      )}
      {enabled && features?.BRIDGE && (
        <Route path="/bridge" element={<BridgePage />} />
      )}
      <Route path="*" element={<Navigate to="/tokens" replace />} />
    </Routes>
  ) : (
    <WelcomePage />
  );
};

export default AppRoutes;
