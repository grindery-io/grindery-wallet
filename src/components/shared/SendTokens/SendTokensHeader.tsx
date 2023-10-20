import React from "react";
import { Box, SxProps, Typography } from "@mui/material";
import { selectAppStore, useAppSelector } from "../../../store";
import { SendStatus } from "../../../types/State";

const SendTokensHeader = () => {
  const {
    user,
    send: { status, input },
  } = useAppSelector(selectAppStore);

  return (
    <Box sx={SendTokensHeaderStyles}>
      <Typography textAlign="center">
        {status === SendStatus.SENDING
          ? "Sending"
          : status === SendStatus.SENT
          ? "Sent"
          : user?.telegramSession
          ? `Send${!input.recipient ? " to" : ""}`
          : ""}
      </Typography>
    </Box>
  );
};

const SendTokensHeaderStyles = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  padding: "0 16px",
  boxSizing: "border-box",
} as SxProps;

export default SendTokensHeader;
