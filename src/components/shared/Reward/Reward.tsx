import React from "react";
import { Box } from "@mui/material";
import { TelegramUserReward } from "../../../types/Telegram";
import RewardHeader from "./RewardHeader";
import RewardCloseButton from "./RewardCloseButton";
import RewardDetails from "./RewardDetails/RewardDetails";

export type RewardProps = {
  reward: TelegramUserReward;
};

const Reward = (props: RewardProps) => {
  const { reward } = props;

  return reward ? (
    <>
      <Box sx={RewardStyles}>
        <RewardHeader />
        <RewardDetails {...props} />
        <RewardCloseButton />
      </Box>
    </>
  ) : null;
};

const RewardStyles = {
  padding: "16px",
  width: "100%",
  boxSizing: "border-box",
};

export default Reward;
