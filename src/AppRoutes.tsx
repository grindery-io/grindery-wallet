import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { selectAppStore, useAppSelector } from "store";

import {
  ActivityPage,
  AppsPage,
  BridgePage,
  BuyPage,
  CommunityPage,
  ContactPage,
  ContactsPage,
  ConvertPage,
  DebugPage,
  OrderPage,
  RewardPage,
  RewardsPage,
  SendPage,
  StakingPage,
  StatsPage,
  SwapPage,
  TokenPage,
  TokensImportPage,
  TokensPage,
  WelcomePage,
} from "components/pages";
import TGEPage from "components/pages/TGEPage/TGEPage";

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
      <Route path="/swap" element={<SwapPage />} />
      <Route path="/convert" element={<ConvertPage />} />
      {enabled && <Route path="/debug/stats" element={<StatsPage />} />}
      {((enabled && features?.BRIDGE) || user?.optin_bridge) && (
        <Route path="/bridge" element={<BridgePage />} />
      )}
      {enabled && features?.STAKING && (
        <Route path="/staking" element={<StakingPage />} />
      )}
      {enabled && features?.GX_PREORDER && (
        <>
          <Route path="/tge/*" element={<TGEPage />} />
          <Route path="/order" element={<OrderPage />} />
        </>
      )}
      <Route path="/buy" element={<BuyPage />} />
      <Route path="*" element={<Navigate to="/tokens" replace />} />
    </Routes>
  ) : (
    <WelcomePage />
  );
};

export default AppRoutes;
