import React from "react";
import CallMadeIcon from "@mui/icons-material/CallMade";
import CallReceivedIcon from "@mui/icons-material/CallReceived";
import { Box, ListItemAvatar } from "@mui/material";
import useAppUser from "../../../hooks/useAppUser";
import UserAvatar from "../UserAvatar";
import { selectAppStore, useAppSelector } from "../../../store";
import { ActivityListItemProps } from "./ActivityListItem";

/**
 * Single activity list item avatar
 */
const ActivityListItemAvatar = ({ activity }: ActivityListItemProps) => {
  const { user } = useAppSelector(selectAppStore);

  const isSender = user?.userTelegramID === activity.senderTgId;

  const secondaryUserId = isSender
    ? activity.recipientTgId
    : activity.senderTgId;

  const { user: secondaryUser } = useAppUser(secondaryUserId);

  return (
    <ListItemAvatar sx={ListItemAvatarStyles}>
      <UserAvatar user={secondaryUser} size={36} />
      <Box sx={AvatarIconBoxStyles}>
        {isSender ? (
          <CallMadeIcon sx={AvatarIconStyles} />
        ) : (
          <CallReceivedIcon sx={AvatarIconStyles} />
        )}
      </Box>
    </ListItemAvatar>
  );
};

const ListItemAvatarStyles = {
  minWidth: "36px",
  marginRight: "10px",
  position: "relative",
};

const AvatarIconBoxStyles = {
  position: "absolute",
  bottom: "-2px",
  right: "-2px",
  borderRadius: "50%",
  background: "var(--tg-theme-bg-color, #ffffff)",
  padding: "2px",
};

const AvatarIconStyles = {
  color: "var(--tg-theme-text-color, #000000)",
  display: "block",
  fontSize: "12px",
};

export default ActivityListItemAvatar;
