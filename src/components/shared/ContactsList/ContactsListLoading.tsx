import React from "react";
import { Box, CircularProgress } from "@mui/material";
import { ContactsListProps } from "./ContactsList";

const ContactsListLoading = (props: ContactsListProps) => {
  return (
    <Box sx={ContactsListLoadingStyles}>
      <CircularProgress
        sx={{ color: "var(--tg-theme-button-color, #2481cc)" }}
      />
    </Box>
  );
};

const ContactsListLoadingStyles = { margin: "50px", textAlign: "center" };

export default ContactsListLoading;
