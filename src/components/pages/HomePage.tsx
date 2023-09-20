import React from "react";
import Balance from "../shared/Balance";
import SendButton from "../shared/SendButton";
import Address from "../shared/Address";
import Contacts from "../shared/Contacts";
import BottomNavigation from "../shared/BottomNavigation";
import useAppContext from "../../hooks/useAppContext";
import Tokens from "../shared/Tokens";
import NFTs from "../shared/NFTs";
import Rewards from "../shared/Rewards";
import Activity from "../shared/Activity";

type Props = {};

const HomePage = (props: Props) => {
  const {
    state: { activeTab },
  } = useAppContext();
  return (
    <>
      <Address />
      <Balance />
      <SendButton />
      {activeTab === "contacts" && <Contacts />}
      {activeTab === "tokens" && <Tokens />}
      {activeTab === "nfts" && <NFTs />}
      {activeTab === "rewards" && <Rewards />}
      {activeTab === "activity" && <Activity />}

      <BottomNavigation />
    </>
  );
};

export default HomePage;
