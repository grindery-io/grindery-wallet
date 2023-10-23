import React from "react";
import BottomNavigation from "../shared/BottomNavigation";
import SendButton from "../shared/SendButton";
import TokensTabs from "../shared/TokensTabs";
import Balance from "../shared/Balance/Balance";

const TokensPage = () => {
  return (
    <>
      <Balance />
      <SendButton />
      <TokensTabs />
      <BottomNavigation />
    </>
  );
};

export default TokensPage;
