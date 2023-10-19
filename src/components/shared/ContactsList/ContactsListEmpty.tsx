import React from "react";
import { Typography } from "@mui/material";
import { ContactsListProps } from "./ContactsList";

const ContactsListEmpty = (props: ContactsListProps) => {
  return (
    <Typography sx={ContactsListEmptyStyles}>
      Your contacts list is empty.
    </Typography>
  );
};

const ContactsListEmptyStyles = {
  margin: "20px",
  textAlign: "center",
};

export default ContactsListEmpty;
