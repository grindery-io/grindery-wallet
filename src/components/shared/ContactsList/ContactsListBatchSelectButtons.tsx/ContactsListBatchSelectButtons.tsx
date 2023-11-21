import React from "react";
import { Button, Stack } from "@mui/material";
import {
  ContactsListOnSelectCancelType,
  ContactsListOnSelectConfirmType,
  ContactsListOnSelectType,
  ContactsListSelectedType,
} from "../ContactsList";

export type ContactsListBatchSelectButtonsProps = {
  selected?: ContactsListSelectedType;
  onSelect?: ContactsListOnSelectType;
  onSelectCancel?: ContactsListOnSelectCancelType;
  onSelectConfirm?: ContactsListOnSelectConfirmType;
};

const ContactsListBatchSelectButtons = (
  props: ContactsListBatchSelectButtonsProps
) => {
  return typeof props.onSelect !== "undefined" &&
    props.selected &&
    props.selected.length > 0 ? (
    <Stack direction="row" spacing="8px" sx={ContactsListButtonStyles}>
      {typeof props.onSelectCancel !== "undefined" && (
        <Button
          onClick={() => {
            if (typeof props.onSelectCancel !== "undefined") {
              props.onSelectCancel();
            }
          }}
          variant="outlined"
          size="large"
          sx={ContactsListButtonCancelStyles}
        >
          Cancel
        </Button>
      )}
      {typeof props.onSelectConfirm !== "undefined" && (
        <Button
          onClick={() => {
            if (typeof props.onSelectConfirm !== "undefined") {
              props.onSelectConfirm();
            }
          }}
          fullWidth
          size="large"
          sx={ContactsListButtonSendStyles}
          variant="contained"
        >
          Send x {props.selected?.length || 0} contact
          {props.selected && props.selected?.length > 1 ? "s" : ""}
        </Button>
      )}
    </Stack>
  ) : null;
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

export default ContactsListBatchSelectButtons;
