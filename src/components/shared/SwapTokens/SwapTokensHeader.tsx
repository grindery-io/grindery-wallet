import React from "react";
import { Box, SxProps, Typography } from "@mui/material";
import { selectAppStore, useAppSelector } from "../../../store";
import { SwapStatus } from "../../../types/State";

const SwapTokensHeader = () => {
  const {
    user,
    swap: { status },
  } = useAppSelector(selectAppStore);

  return (
    <Box sx={SwapTokensHeaderStyles}>
      <Typography textAlign="center">
        {status === SwapStatus.SENDING
          ? "Sending"
          : status === SwapStatus.SENT
          ? "Sent"
          : user?.telegramSession
          ? "Swap"
          : ""}
      </Typography>
    </Box>
  );
};

const SwapTokensHeaderStyles = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  padding: "0 16px",
  boxSizing: "border-box",
} as SxProps;

export default SwapTokensHeader;
