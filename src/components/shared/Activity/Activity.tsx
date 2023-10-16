import React from "react";
import { TelegramUserActivity } from "../../../types/Telegram";
import { ListItem, ListItemButton } from "@mui/material";
import ActivityAvatar from "./ActivityAvatar";
import ActivityText from "./ActivityText";
import ActivityEnd from "./ActivityEnd";

/**
 * Single activity list item component properties
 */
export type ActivityProps = {
  /**
   * Telegram user activity
   */
  activity: TelegramUserActivity;
  /**
   * On activity click callback
   */
  onClick?: () => void;
  /**
   * On activity avatar click callback
   */
  onAvatarClick?: () => void;
};

/**
 * Single activity list item
 */
const Activity = (props: ActivityProps) => {
  const { activity, onClick } = props;

  /**
   * Handle activity item click
   */
  const handleClick = () => {
    setTimeout(() => {
      if (typeof onClick !== "undefined") {
        onClick();
      } else {
        if (window.Telegram?.WebApp?.openLink) {
          window.Telegram.WebApp.openLink(
            `https://polygonscan.com/tx/${activity.transactionHash}`
          );
        } else {
          window.open(
            `https://polygonscan.com/tx/${activity.transactionHash}`,
            "_blank"
          );
        }
      }
    }, 150);
  };

  return (
    <ListItem sx={ListItemStyles}>
      <ListItemButton sx={{ padding: "10px" }} onClick={handleClick}>
        <ActivityAvatar {...props} />
        <ActivityText {...props} />
        <ActivityEnd {...props} />
      </ListItemButton>
    </ListItem>
  );
};

/**
 * ListItem `sx` property
 */
const ListItemStyles = {
  margin: "10px 16px 0",
  width: "calc(100% - 32px)",
  padding: 0,
  backgroundColor: "transparent",
  border: "1px solid var(--gr-theme-divider-color)",
  borderRadius: "5px",
  overflow: "hidden",
};

export default Activity;
