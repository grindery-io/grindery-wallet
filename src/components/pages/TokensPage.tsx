import React from "react";
import BottomNavigation from "../shared/BottomNavigation/BottomNavigation";
import TokensTabs from "../shared/TokensTabs";
import Balance from "../shared/Balance/Balance";
import MainButtonsGroup from "../shared/MainButtonsGroup/MainButtonsGroup";
import AccountRecoveryBanner from "../shared/AccountRecoveryBanner/AccountRecoveryBanner";
import { selectAppStore, useAppSelector } from "store";
import TGEBanner from "components/shared/TGEBanner/TGEBanner";

const TokensPage = () => {
  const {
    debug: { enabled, features },
  } = useAppSelector(selectAppStore);
  return (
    <>
      {enabled && features?.GX_PREORDER && <TGEBanner />}
      <Balance />
      <MainButtonsGroup />
      <TokensTabs />
      <AccountRecoveryBanner />
      <BottomNavigation />
    </>
  );
};

export default TokensPage;
