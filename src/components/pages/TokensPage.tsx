import React from "react";
import BottomNavigation from "../shared/BottomNavigation/BottomNavigation";
import TokensTabs from "../shared/TokensTabs";
import Balance from "../shared/Balance/Balance";
import MainButtonsGroup from "../shared/MainButtonsGroup/MainButtonsGroup";
import AccountRecoveryBanner from "../shared/AccountRecoveryBanner/AccountRecoveryBanner";
import { selectAppStore, useAppSelector } from "store";
import OrderBanner from "components/shared/OrderBanner/OrderBanner";

const TokensPage = () => {
  const {
    debug: { enabled, features },
  } = useAppSelector(selectAppStore);
  return (
    <>
      {enabled && features?.GX_PREORDER && <OrderBanner />}
      <Balance />
      <MainButtonsGroup />
      <TokensTabs />
      <AccountRecoveryBanner />
      <BottomNavigation />
    </>
  );
};

export default TokensPage;
