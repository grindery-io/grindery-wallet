import React from "react";
import Contacts from "../shared/Contacts";
import BottomNavigation from "../shared/BottomNavigation";
import useAppContext from "../../hooks/useAppContext";
import Tokens from "../shared/Tokens";
import NFTs from "../shared/NFTs";
import Rewards from "../shared/Rewards";
import Activities from "../shared/Activities";
import AppHeader from "../shared/AppHeader";
import { useNavigate } from "react-router";

const HomePage = () => {
  const {
    state: { activeTab },
  } = useAppContext();
  let navigate = useNavigate();
  return (
    <>
      <AppHeader />
      {activeTab === "tokens" && <Tokens />}
      {activeTab === "contacts" && (
        <Contacts
          onContactClick={(contact) => {
            navigate(`/send?recipient=${contact.id}`);
          }}
        />
      )}
      {activeTab === "nfts" && <NFTs />}
      {activeTab === "rewards" && <Rewards />}
      {activeTab === "activity" && <Activities />}

      <BottomNavigation />
    </>
  );
};

export default HomePage;
