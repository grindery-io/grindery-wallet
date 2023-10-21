import React from "react";
import BottomNavigation from "../shared/BottomNavigation";
import ReferralBanner from "../shared/ReferralBanner";
import RewardsList from "../shared/RewardsList/RewardsList";

const RewardsPage = () => {
  return (
    <>
      <RewardsList />
      <ReferralBanner />
      <BottomNavigation />
    </>
  );
};

export default RewardsPage;
