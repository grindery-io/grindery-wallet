import React from "react";
import CheckIcon from "../../icons/CheckIcon";
import { Box, Typography } from "@mui/material";
import { ContactProps } from "./ContactListItem";

const ContactListItemEnd = (props: ContactProps) => {
  const { contact, selected } = props;

  return (
    <Box ml="auto">
      {selected ? (
        <Box sx={BoxSelectedStyles}>
          <CheckIcon />
        </Box>
      ) : contact.isInvited && !contact.isGrinderyUser ? (
        <Box sx={BoxInvitedStyles}>
          <Typography component="span" variant="xs" color="hint">
            Invited
          </Typography>
          <CheckIcon sx={{ color: "#97C4C7" }} />
        </Box>
      ) : !contact.isInvited && !contact.isGrinderyUser ? (
        <Box sx={BoxEligibleStyles}>
          <Typography component="span" variant="xs" color="hint">
            Eligible!
          </Typography>
          <CheckIcon sx={{ color: "#2481CC" }} />
        </Box>
      ) : null}
    </Box>
  );
};

const BoxSelectedStyles = {
  position: "relative",
  top: "-6px",
  display: "flex",
  alignItems: "center",
  flexDirection: "row",
  justifyContent: "flex-end",
  flexWrap: "nowrap",
  gap: "4px",
  color: "var(--tg-theme-button-color, #2481cc)",
};

const BoxInvitedStyles = {
  position: "relative",
  top: "-6px",
  display: "flex",
  alignItems: "center",
  flexDirection: "row",
  justifyContent: "flex-end",
  flexWrap: "nowrap",
  gap: "4px",
};

const BoxEligibleStyles = {
  position: "relative",
  top: "-6px",
  display: "flex",
  alignItems: "center",
  flexDirection: "row",
  justifyContent: "flex-end",
  flexWrap: "nowrap",
  gap: "4px",
};

export default ContactListItemEnd;
