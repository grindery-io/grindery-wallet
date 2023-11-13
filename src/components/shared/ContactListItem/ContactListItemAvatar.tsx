import React from "react";
import { ListItemAvatar } from "@mui/material";
import ContactAvatar from "../Contact/ContactAvatar/ContactAvatar";

const ContactListItemAvatar = () => {
  return (
    <ListItemAvatar
      sx={{ minWidth: "36px", marginRight: "16px", position: "relative" }}
    >
      <ContactAvatar size={36} badgeSize={16} />
    </ListItemAvatar>
  );
};

export default ContactListItemAvatar;
