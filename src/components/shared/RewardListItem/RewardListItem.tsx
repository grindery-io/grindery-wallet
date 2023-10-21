import React from "react";
import { TelegramUserReward } from "../../../types/Telegram";
import { ListItem, ListItemButton } from "@mui/material";
import RewardListItemEnd from "./RewardListItemEnd";
import RewardListItemText from "./RewardListItemText";
import RewardListItemAvatar from "./RewardListItemAvatar";

export type RewardListItemProps = {
  reward: TelegramUserReward;
  onClick?: () => void;
  type?: "default" | "referral";
};

const RewardListItem = (props: RewardListItemProps) => {
  const { reward, type = "default", onClick } = props;

  const handleClick = () => {
    setTimeout(() => {
      if (typeof onClick !== "undefined") {
        onClick();
      } else {
        if (window.Telegram?.WebApp?.openLink) {
          window.Telegram.WebApp.openLink(
            `https://polygonscan.com/tx/${reward.transactionHash}`
          );
        } else {
          window.open(
            `https://polygonscan.com/tx/${reward.transactionHash}`,
            "_blank"
          );
        }
      }
    }, 150);
  };

  return (
    <ListItem sx={RewardListItemStyles}>
      <ListItemButton sx={{ padding: "10px" }} onClick={handleClick}>
        {type === "referral" && <RewardListItemAvatar {...props} />}
        <RewardListItemText {...props} />
        <RewardListItemEnd {...props} />
      </ListItemButton>
    </ListItem>
  );
};

const RewardListItemStyles = {
  margin: "10px 16px 0",
  width: "calc(100% - 32px)",
  padding: 0,
  backgroundColor: "transparent",
  border: "1px solid var(--gr-theme-divider-color)",
  borderRadius: "5px",
  overflow: "hidden",
};

export default RewardListItem;
