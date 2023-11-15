import React from "react";
import { Box, Typography } from "@mui/material";
import ContactAvatar from "../Contact/ContactAvatar/ContactAvatar";
import ContactName from "../Contact/ContactName/ContactName";

const ContactViewDetails = () => {
  return (
    <Box>
      <ContactAvatar size={130} badgeSize={32} sx={{ margin: "20px auto 0" }} />
      <Typography textAlign="center" variant="lg" mt="16px">
        <ContactName format="default" />
      </Typography>
    </Box>
  );
};

export default ContactViewDetails;
