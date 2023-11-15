import React from "react";
import BottomNavigation from "../shared/BottomNavigation/BottomNavigation";
import TokensTabs from "../shared/TokensTabs";
import Balance from "../shared/Balance/Balance";
import MainButtonsGroup from "../shared/MainButtonsGroup/MainButtonsGroup";
import AccountRecoveryBanner from "../shared/AccountRecoveryBanner";

const TokensPage = () => {
  return (
    <>
      <Balance />
      <MainButtonsGroup />
      <TokensTabs />
      <AccountRecoveryBanner />
      <BottomNavigation />
    </>
  );
};

export default TokensPage;
