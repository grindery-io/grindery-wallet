import React from "react";
import { useLongPress } from "use-long-press";
import { ListItem, ListItemButton } from "@mui/material";
import { selectAppStore, useAppSelector } from "../../../store";
import ContactListItemAvatar from "./ContactListItemAvatar";
import ContactListItemText from "./ContactListItemText";
import ContactListItemEnd from "./ContactListItemEnd";
import Contact, { ContactType } from "../Contact/Contact";

export type ContactProps = {
  contact: ContactType;
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
    <Contact contact={contact}>
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
            onContactClick(contact.id);
          }}
          {...(typeof onContactPress !== "undefined" &&
          debug.features?.BATCH_SENDING
            ? bind()
            : {})}
        >
          <ContactListItemAvatar />
          <ContactListItemText />
          <ContactListItemEnd {...props} />
        </ListItemButton>
      </ListItem>
    </Contact>
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
