import React from "react";
import CallMadeIcon from "@mui/icons-material/CallMade";
import CallReceivedIcon from "@mui/icons-material/CallReceived";
import { Box, ListItemAvatar, Stack } from "@mui/material";
import { selectAppStore, useAppSelector } from "../../../store";
import { ActivityListItemProps } from "./ActivityListItem";
import Contact from "../Contact/Contact";
import ContactAvatar from "../Contact/ContactAvatar/ContactAvatar";

/**
 * Single activity list item avatar
 */
const ActivityListItemAvatar = ({ activity }: ActivityListItemProps) => {
  const {
    user,
    contacts: { items },
  } = useAppSelector(selectAppStore);

  const isSender = user?.userTelegramID === activity.senderTgId;

  const secondaryUserId = isSender
    ? activity.recipientTgId
    : activity.senderTgId;

  const contact = items?.find((item) => item.id === secondaryUserId);

  return contact ? (
    <Contact contact={contact}>
      <ListItemAvatar sx={ListItemAvatarStyles}>
        <ContactAvatar size={36} />
        <Box sx={AvatarIconBoxStyles}>
          {isSender ? (
            <CallMadeIcon sx={AvatarIconStyles} />
          ) : (
            <CallReceivedIcon sx={AvatarIconStyles} />
          )}
        </Box>
      </ListItemAvatar>
    </Contact>
  ) : (
    <ListItemAvatar sx={ListItemAvatarStyles}>
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{
          width: "36px",
          height: "36px",
          minWidth: "36px",
          background: "var(--tg-theme-secondary-bg-color, #efeff3)",
          borderRadius: "50%",
        }}
      >
        {isSender ? (
          <CallMadeIcon
            sx={{
              color: "var(--tg-theme-text-color, #000000)",
              fontSize: "16px",
            }}
          />
        ) : (
          <CallReceivedIcon
            sx={{
              color: "var(--tg-theme-text-color, #000000)",
              fontSize: "16px",
            }}
          />
        )}
      </Stack>
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
