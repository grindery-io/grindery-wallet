import React from "react";
import { Box, Typography } from "@mui/material";
import ContactAvatar from "../Contact/ContactAvatar/ContactAvatar";
import ContactName from "../Contact/ContactName/ContactName";
import UserAvatar from "../User/UserAvatar/UserAvatar";
import UserName from "../User/UserName/UserName";

const ContactViewDetails = ({ type }: { type?: "contact" | "user" }) => {
  return (
    <Box>
      {!type || type === "contact" ? (
        <ContactAvatar
          size={130}
          badgeSize={32}
          sx={{ margin: "20px auto 0" }}
        />
      ) : (
        <UserAvatar size={130} badgeSize={32} sx={{ margin: "20px auto 0" }} />
      )}
      <Typography textAlign="center" variant="lg" mt="16px">
        {!type || type === "contact" ? (
          <ContactName format="default" />
        ) : (
          <UserName />
        )}
      </Typography>
    </Box>
  );
};

export default ContactViewDetails;
