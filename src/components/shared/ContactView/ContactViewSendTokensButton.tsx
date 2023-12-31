import React from "react";
import { useNavigate } from "react-router";
import { ICONS, MAX_WIDTH } from "../../../constants";
import { Box, Button } from "@mui/material";
import { useContact } from "../Contact/Contact";
import { useUser } from "../User/User";

const ContactViewSendTokensButton = () => {
  const navigate = useNavigate();
  const contact = useContact();
  const user = useUser();
  const id = contact.id || user?.userTelegramID || "";

  return (
    <Box sx={ContactViewSendTokensButtonStyles}>
      <Button
        variant="contained"
        startIcon={
          <img
            src={ICONS.ARROW_OPEN}
            alt=""
            style={{ width: "16px", height: "16px", display: "block" }}
          />
        }
        fullWidth
        onClick={() => {
          navigate(`/send?id=${id}`);
        }}
        sx={{
          boxShadow: "5px 5px 20px 0px var(--gr-theme-button-shadow-color)",
        }}
      >
        Send tokens
      </Button>
    </Box>
  );
};

const ContactViewSendTokensButtonStyles = {
  padding: "16px",
  position: "fixed",
  width: "100%",
  maxWidth: MAX_WIDTH,
  zIndex: 2,
  left: "50%",
  transform: "translateX(-50%)",
  bottom: 0,
};

export default ContactViewSendTokensButton;
