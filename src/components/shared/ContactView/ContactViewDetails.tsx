import React from "react";
import { Box, Typography } from "@mui/material";
import { AppUser } from "../../../hooks/useAppUser";
import UserAvatar from "../UserAvatar";

const ContactViewDetails = ({ contact }: { contact: AppUser }) => {
  return (
    <Box>
      <Box sx={ContactViewDetailsAvatarStyles}>
        <UserAvatar user={contact} size={130} />

        {contact.isGrinderyUser && (
          <Box sx={ContactViewDetailsAvatarBadgeStyles}>
            <img src="https://app.grindery.io/logo192.png" alt="" />
          </Box>
        )}
      </Box>

      <Typography textAlign="center" variant="lg" mt="16px">
        {contact.name}
      </Typography>
    </Box>
  );
};

const ContactViewDetailsAvatarStyles = {
  margin: "20px auto 0",
  position: "relative",
  width: "130px",
  height: "130px",
};
const ContactViewDetailsAvatarBadgeStyles = {
  position: "absolute",
  bottom: "-4px",
  right: "-4px",
  border: "2px solid var(--tg-theme-bg-color, #ffffff)",
  borderRadius: "50%",
  "& img": { width: "32px", height: "32px", display: "block" },
};

export default ContactViewDetails;
