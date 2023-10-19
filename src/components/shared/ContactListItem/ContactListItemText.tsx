import React from "react";
import { ListItemText } from "@mui/material";
import useAppUser from "../../../hooks/useAppUser";
import { ContactProps } from "./ContactListItem";

const ContactListItemText = (props: ContactProps) => {
  const { contact } = props;
  const { user } = useAppUser(contact.id);

  return (
    <ListItemText
      sx={ListItemTextStyles}
      primary={user.name}
      primaryTypographyProps={{
        variant: "xs",
        sx: PrimaryTypographyStyles,
      }}
      secondaryTypographyProps={{
        variant: "xs",
        color: "hint",
        sx: SecondaryTypographyStyles,
      }}
      secondary={user.username ? "@" + user.username : undefined}
    ></ListItemText>
  );
};

const ListItemTextStyles = {
  margin: "0 10px 0 0",
};

const PrimaryTypographyStyles = {
  lineHeight: 1.5,
  display: "-webkit-box",
  maxWidth: "100%",
  WebkitLineClamp: 1,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
};

const SecondaryTypographyStyles = {
  lineHeight: 1.5,
  display: "-webkit-box",
  maxWidth: "100%",
  WebkitLineClamp: 1,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
};

export default ContactListItemText;
