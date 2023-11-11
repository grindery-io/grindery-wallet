import React from "react";
import BottomNavigation from "../shared/BottomNavigation";
import TokensTabs from "../shared/TokensTabs";
import Balance from "../shared/Balance/Balance";
import MainButtonsGroup from "../shared/MainButtonsGroup/MainButtonsGroup";

const TokensPage = () => {
  return (
    <>
      <Balance />
      <MainButtonsGroup />
      <TokensTabs />
      <BottomNavigation />
    </>
  );
};

export default TokensPage;
