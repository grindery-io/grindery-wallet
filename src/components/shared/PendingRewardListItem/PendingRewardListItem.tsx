import React from "react";
import { TelegramUserActivity } from "../../../types/Telegram";
import { ListItem } from "@mui/material";
import PendingRewardListItemAvatar from "./PendingRewardListItemAvatar";
import PendingRewardListItemText from "./PendingRewardListItemText";
import PendingRewardListItemEnd from "./PendingRewardListItemEnd";
import { selectAppStore, useAppSelector } from "store";
import Contact from "../Contact/Contact";

export type PendingRewardListItemProps = {
  activity: TelegramUserActivity;
  onClick?: () => void;
  onAvatarClick?: () => void;
  onTextClick?: () => void;
};

const PendingRewardListItem = (props: PendingRewardListItemProps) => {
  const { activity } = props;
  const {
    user,
    contacts: { items },
  } = useAppSelector(selectAppStore);

  const secondaryUserId =
    user?.userTelegramID === activity.senderTgId
      ? activity.recipientTgId
      : activity.senderTgId;

  const contact = items?.find((contact) => contact.id === secondaryUserId);

  return contact ? (
    <Contact contact={contact}>
      <ListItem sx={PendingRewardListItemStyles}>
        <PendingRewardListItemAvatar {...props} />
        <PendingRewardListItemText {...props} />
        <PendingRewardListItemEnd {...props} />
      </ListItem>
    </Contact>
  ) : null;
};

const PendingRewardListItemStyles = {
  margin: "10px 16px 0",
  width: "calc(100% - 32px)",
  padding: "10px",
  backgroundColor: "transparent",
  border: "1px solid var(--gr-theme-divider-color)",
  borderRadius: "5px",
  overflow: "hidden",
};

export default PendingRewardListItem;
