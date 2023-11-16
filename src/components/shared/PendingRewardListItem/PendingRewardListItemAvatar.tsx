import React from "react";
import CallMadeIcon from "@mui/icons-material/CallMade";
import CallReceivedIcon from "@mui/icons-material/CallReceived";
import { Box, ListItemAvatar } from "@mui/material";
import { selectAppStore, useAppSelector } from "../../../store";
import { PendingRewardListItemProps } from "./PendingRewardListItem";
import ContactAvatar from "../Contact/ContactAvatar/ContactAvatar";

const PendingRewardListItemAvatar = ({
  activity,
  onAvatarClick,
}: PendingRewardListItemProps) => {
  const { user } = useAppSelector(selectAppStore);

  return (
    <ListItemAvatar
      onClick={onAvatarClick ? onAvatarClick : undefined}
      sx={{ minWidth: "36px", marginRight: "10px", position: "relative" }}
    >
      <ContactAvatar size={36} />

      <Box
        sx={{
          position: "absolute",
          bottom: "-2px",
          right: "-2px",
          borderRadius: "50%",
          background: "var(--tg-theme-bg-color, #ffffff)",
          padding: "2px",
        }}
      >
        {user?.userTelegramID === activity?.senderTgId ? (
          <CallMadeIcon
            sx={{
              color: "var(--tg-theme-text-color, #000000)",
              display: "block",
              fontSize: "12px",
            }}
          />
        ) : (
          <CallReceivedIcon
            sx={{
              color: "var(--tg-theme-text-color, #000000)",
              display: "block",
              fontSize: "12px",
            }}
          />
        )}
      </Box>
    </ListItemAvatar>
  );
};

export default PendingRewardListItemAvatar;
