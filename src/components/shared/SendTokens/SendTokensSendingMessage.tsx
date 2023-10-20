import React from "react";
import { Box, CircularProgress } from "@mui/material";

const SendTokensSendingMessage = () => {
  return (
    <Box
      sx={{
        margin: "50px 20px",
        textAlign: "center",
      }}
    >
      <CircularProgress
        style={{ color: "var(--tg-theme-button-color, #2481cc)" }}
      />
    </Box>
  );
};

export default SendTokensSendingMessage;
