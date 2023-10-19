import React from "react";
import { Box, ListItemAvatar } from "@mui/material";
import useAppUser from "../../../hooks/useAppUser";
import UserAvatar from "../UserAvatar";
import { ContactProps } from "./ContactListItem";

const ContactListItemAvatar = (props: ContactProps) => {
  const { contact } = props;
  const { user } = useAppUser(contact.id);

  return (
    <ListItemAvatar
      sx={{ minWidth: "36px", marginRight: "16px", position: "relative" }}
    >
      <UserAvatar user={user} size={36} />
      {user.isGrinderyUser && (
        <Box
          sx={{
            position: "absolute",
            bottom: "-6px",
            right: "-6px",
            border: "2px solid var(--tg-theme-bg-color, #ffffff)",
            borderRadius: "50%",
          }}
        >
          <img
            src="https://app.grindery.io/logo192.png"
            alt=""
            style={{ width: "16px", height: "16px", display: "block" }}
          />
        </Box>
      )}
    </ListItemAvatar>
  );
};

export default ContactListItemAvatar;
