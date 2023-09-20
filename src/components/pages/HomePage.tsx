import React from "react";
import Contacts from "../shared/Contacts";
import BottomNavigation from "../shared/BottomNavigation";
import useAppContext from "../../hooks/useAppContext";
import Tokens from "../shared/Tokens";
import NFTs from "../shared/NFTs";
import Rewards from "../shared/Rewards";
import Activities from "../shared/Activities";

const HomePage = () => {
  const {
    state: { activeTab },
  } = useAppContext();
  return (
    <>
      {activeTab === "tokens" && <Tokens />}
      {activeTab === "contacts" && <Contacts />}
      {activeTab === "nfts" && <NFTs />}
      {activeTab === "rewards" && <Rewards />}
      {activeTab === "activity" && <Activities />}

      <BottomNavigation />
    </>
  );
};

export default HomePage;
