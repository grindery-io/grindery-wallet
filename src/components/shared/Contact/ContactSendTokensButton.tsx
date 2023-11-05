import React from "react";
import { useNavigate } from "react-router";
import { ICONS, MAX_WIDTH } from "../../../constants";
import { Box, Button } from "@mui/material";
import { AppUser } from "../../../hooks/useAppUser";

const ContactSendTokensButton = ({ contact }: { contact: AppUser }) => {
  const navigate = useNavigate();

  return (
    <Box sx={ContactSendTokensButtonStyles}>
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
          navigate(`/send?id=${contact.id}`);
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

const ContactSendTokensButtonStyles = {
  padding: "16px",
  position: "fixed",
  width: "100%",
  maxWidth: MAX_WIDTH,
  zIndex: 2,
  left: "50%",
  transform: "translateX(-50%)",
  bottom: 0,
};

export default ContactSendTokensButton;
