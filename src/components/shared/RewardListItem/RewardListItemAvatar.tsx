import React from "react";
import { Box, ListItemAvatar } from "@mui/material";
import UserAvatar from "../UserAvatar";
import { RewardListItemProps } from "./RewardListItem";
import { selectAppStore, useAppSelector } from "../../../store";
import useAppUser from "../../../hooks/useAppUser";
import CallMadeIcon from "@mui/icons-material/CallMade";
import CallReceivedIcon from "@mui/icons-material/CallReceived";

const RewardListItemAvatar = ({ reward }: RewardListItemProps) => {
  const {
    user,
    activity: { items },
  } = useAppSelector(selectAppStore);
  const activities = items;

  const activity = activities?.find(
    (act) => act.transactionHash === reward.parentTransactionHash
  );

  const secondaryUserId =
    user?.userTelegramID === activity?.senderTgId
      ? activity?.recipientTgId
      : activity?.senderTgId;

  const { user: secondaryUser } = useAppUser(secondaryUserId || "");
  return (
    <ListItemAvatar sx={RewardListItemAvatarStyles}>
      <UserAvatar user={secondaryUser} size={36} />
      <Box sx={IconWrapperStyles}>
        {user?.userTelegramID === activity?.senderTgId ? (
          <CallMadeIcon sx={IconStyles} />
        ) : (
          <CallReceivedIcon sx={IconStyles} />
        )}
      </Box>
    </ListItemAvatar>
  );
};

const RewardListItemAvatarStyles = {
  minWidth: "36px",
  marginRight: "10px",
  position: "relative",
};

const IconWrapperStyles = {
  position: "absolute",
  bottom: "-2px",
  right: "-2px",
  borderRadius: "50%",
  background: "var(--tg-theme-bg-color, #ffffff)",
  padding: "2px",
};

const IconStyles = {
  color: "var(--tg-theme-text-color, #000000)",
  display: "block",
  fontSize: "12px",
};

export default RewardListItemAvatar;
