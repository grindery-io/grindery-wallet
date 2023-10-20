import React from "react";
import { TelegramUserContact } from "../../../types/Telegram";
import { useLongPress } from "use-long-press";
import { ListItem, ListItemButton } from "@mui/material";
import { selectAppStore, useAppSelector } from "../../../store";
import ContactListItemAvatar from "./ContactListItemAvatar";
import ContactListItemText from "./ContactListItemText";
import ContactListItemEnd from "./ContactListItemEnd";

export type ContactProps = {
  contact: TelegramUserContact;
  selected?: boolean;
  onContactClick: (id: string) => void;
  onContactPress?: (id: string) => void;
};

const ContactListItem = (props: ContactProps) => {
  const { contact, selected, onContactClick, onContactPress } = props;
  const { debug } = useAppSelector(selectAppStore);
  const bind = useLongPress(() => {
    if (typeof onContactPress !== "undefined") {
      onContactPress(contact.id);
    }
  });

  return (
    <ListItem
      sx={{
        ...ListItemStyles,
        backgroundColor: selected
          ? "var(--tg-theme-accent-pale)"
          : "transparent",
        border: selected
          ? "1px solid var(--tg-theme-button-color, #2481cc)"
          : "1px solid var(--gr-theme-divider-color)",
      }}
    >
      <ListItemButton
        sx={{
          ...ListItemButtonStyles,
          WebkitUserSelect:
            typeof onContactPress !== "undefined" ? "none" : "auto",
          userSelect: typeof onContactPress !== "undefined" ? "none" : "auto",
        }}
        onClick={() => {
          setTimeout(() => {
            onContactClick(contact.id);
          }, 150);
        }}
        {...(typeof onContactPress !== "undefined" &&
        debug.features?.BATCH_SENDING
          ? bind()
          : {})}
      >
        <ContactListItemAvatar {...props} />
        <ContactListItemText {...props} />
        <ContactListItemEnd {...props} />
      </ListItemButton>
    </ListItem>
  );
};

const ListItemStyles = {
  margin: "10px 16px 0",
  width: "calc(100% - 32px)",
  padding: 0,
  borderRadius: "5px",
  overflow: "hidden",
};

const ListItemButtonStyles = {
  padding: "10px",
};

export default ContactListItem;
