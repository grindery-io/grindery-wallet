import React from "react";
import { Box, SxProps, Typography } from "@mui/material";
import { selectAppStore, useAppSelector } from "../../../store";
import { BridgeStatus } from "../../../types/State";

const BridgeTokensHeader = () => {
  const {
    bridge: { status },
  } = useAppSelector(selectAppStore);

  return (
    <Box sx={BridgeTokensHeaderStyles}>
      <Typography textAlign="center" variant="xl" fontWeight="bold">
        {status === BridgeStatus.SENDING
          ? "Sending"
          : status === BridgeStatus.SENT
          ? "Sent"
          : "Bridge"}
      </Typography>
    </Box>
  );
};

const BridgeTokensHeaderStyles = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  padding: "0 16px",
  boxSizing: "border-box",
} as SxProps;

export default BridgeTokensHeader;
