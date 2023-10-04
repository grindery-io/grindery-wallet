import React from "react";
import BottomNavigation from "../shared/BottomNavigation";
import Balance from "../shared/Balance";
import SendButton from "../shared/SendButton";
import TokensTabs from "../shared/TokensTabs";

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
