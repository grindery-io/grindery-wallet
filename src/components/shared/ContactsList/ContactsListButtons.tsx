import React from "react";
import { Button, Stack } from "@mui/material";
import { ContactsListProps } from "./ContactsList";

const ContactsListButtons = (props: ContactsListProps) => {
  const { selected, onSelectCancel, onSelectConfirm } = props;

  return (
    <Stack direction="row" spacing="8px" sx={ContactsListButtonStyles}>
      <Button
        onClick={
          onSelectCancel
            ? () => {
                setTimeout(() => {
                  onSelectCancel();
                }, 150);
              }
            : undefined
        }
        variant="outlined"
        size="large"
        sx={ContactsListButtonCancelStyles}
      >
        Cancel
      </Button>
      <Button
        onClick={
          onSelectConfirm
            ? () => {
                setTimeout(() => {
                  onSelectConfirm();
                }, 150);
              }
            : undefined
        }
        fullWidth
        size="large"
        sx={ContactsListButtonSendStyles}
        variant="contained"
      >
        Send x {selected?.length || 0} contact
        {selected && selected?.length > 1 ? "s" : ""}
      </Button>
    </Stack>
  );
};

const ContactsListButtonStyles = {
  position: "fixed",
  bottom: "0px",
  padding: "0px 8px 16px",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  maxWidth: "768px",
  zIndex: 2,
};

const ContactsListButtonCancelStyles = {
  paddingLeft: "48px",
  paddingRight: "48px",
  backgroundColor: "var(--tg-theme-bg-color, #ffffff)",
  "&:hover": {
    backgroundColor: "var(--tg-theme-bg-color, #ffffff)",
  },
  boxShadow: "5px 5px 20px 0px var(--gr-theme-button-shadow-color)",
};

const ContactsListButtonSendStyles = {
  boxShadow: "5px 5px 20px 0px var(--gr-theme-button-shadow-color)",
};

export default ContactsListButtons;
