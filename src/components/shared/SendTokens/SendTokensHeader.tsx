import React from "react";
import { Box, SxProps, Typography } from "@mui/material";
import { selectAppStore, useAppSelector } from "../../../store";
import { SendStatus } from "../../../types/State";

const SendTokensHeader = () => {
  const {
    send: { status, input },
  } = useAppSelector(selectAppStore);

  return (
    <Box sx={SendTokensHeaderStyles}>
      <Typography textAlign="center" variant="xl" fontWeight="bold">
        {status === SendStatus.SENDING
          ? "Sending"
          : status === SendStatus.SENT
          ? "Sent"
          : `Send${!input.recipient ? " to" : ""}`}
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
  padding: "16px 16px 0",
  boxSizing: "border-box",
} as SxProps;

export default SendTokensHeader;
