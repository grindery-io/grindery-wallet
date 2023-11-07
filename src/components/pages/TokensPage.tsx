import React from "react";
import BottomNavigation from "../shared/BottomNavigation";
import TokensTabs from "../shared/TokensTabs";
import Balance from "../shared/Balance/Balance";
import ActionButtonsGroup from "../shared/ActionButtonsGroup/ActionButtonsGroup";

const TokensPage = () => {
  return (
    <>
      <Balance />
      <ActionButtonsGroup />
      <TokensTabs />
      <BottomNavigation />
    </>
  );
};

export default TokensPage;
