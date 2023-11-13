import React from "react";
import { ListItemText } from "@mui/material";
import ContactName from "../Contact/ContactName/ContactName";
import { useContact } from "../Contact/Contact";

const ContactListItemText = () => {
  const { username } = useContact();

  return (
    <ListItemText
      sx={ListItemTextStyles}
      primary={<ContactName />}
      primaryTypographyProps={{
        variant: "xs",
        sx: PrimaryTypographyStyles,
      }}
      secondaryTypographyProps={{
        variant: "xs",
        color: "hint",
        sx: SecondaryTypographyStyles,
      }}
      secondary={
        username ? (
          <span>
            @<ContactName format="username" />
          </span>
        ) : undefined
      }
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
