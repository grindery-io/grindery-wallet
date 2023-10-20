import React from "react";
import { TelegramUserActivity } from "../../../types/Telegram";
import { ListItem, ListItemButton } from "@mui/material";
import ActivityListItemText from "./ActivityListItemText";
import ActivityListItemAvatar from "./ActivityListItemAvatar";
import ActivityListItemEnd from "./ActivityListItemEnd";

/**
 * Single activity list item component properties
 */
export type ActivityListItemProps = {
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
const ActivityListItem = (props: ActivityListItemProps) => {
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
        <ActivityListItemAvatar {...props} />
        <ActivityListItemText {...props} />
        <ActivityListItemEnd {...props} />
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

export default ActivityListItem;
