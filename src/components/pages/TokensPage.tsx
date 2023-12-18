import React from "react";
import BottomNavigation from "../shared/BottomNavigation/BottomNavigation";
import TokensTabs from "../shared/TokensTabs";
import Balance from "../shared/Balance/Balance";
import MainButtonsGroup from "../shared/MainButtonsGroup/MainButtonsGroup";
import AccountRecoveryBanner from "../shared/AccountRecoveryBanner/AccountRecoveryBanner";
import { selectAppStore, useAppSelector } from "store";
import PreOrderBanner from "components/shared/PreOrderBanner/PreOrderBanner";

const TokensPage = () => {
  const {
    debug: { enabled, features },
  } = useAppSelector(selectAppStore);
  return (
    <>
      {enabled && features?.GX_PREORDER && <PreOrderBanner />}
      <Balance />
      <MainButtonsGroup />
      <TokensTabs />
      <AccountRecoveryBanner />
      <BottomNavigation />
    </>
  );
};

export default TokensPage;
