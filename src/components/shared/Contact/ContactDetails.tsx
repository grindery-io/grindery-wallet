import React from "react";
import { Box, Typography } from "@mui/material";
import { AppUser } from "../../../hooks/useAppUser";
import UserAvatar from "../UserAvatar";

const ContactDetails = ({ contact }: { contact: AppUser }) => {
  return (
    <Box>
      <Box sx={ContactDetailsAvatarStyles}>
        <UserAvatar user={contact} size={130} />

        {contact.isGrinderyUser && (
          <Box sx={ContactDetailsAvatarBadgeStyles}>
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

const ContactDetailsAvatarStyles = {
  marginTop: "20px",
  position: "relative",
};
const ContactDetailsAvatarBadgeStyles = {
  position: "absolute",
  bottom: "-4px",
  right: "-4px",
  border: "2px solid var(--tg-theme-bg-color, #ffffff)",
  borderRadius: "50%",
  "& img": { width: "32px", height: "32px", display: "block" },
};

export default ContactDetails;
