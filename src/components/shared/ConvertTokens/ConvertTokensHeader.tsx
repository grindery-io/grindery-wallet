import React from "react";
import { Box, SxProps, Typography } from "@mui/material";
import { selectAppStore, useAppSelector } from "../../../store";
import { ConvertStatus } from "../../../types/State";

const ConvertTokensHeader = () => {
  const {
    convert: { status },
  } = useAppSelector(selectAppStore);

  return (
    <Box sx={ConvertTokensHeaderStyles}>
      <Typography textAlign="center" variant="xl" fontWeight="bold">
        {status === ConvertStatus.SENDING
          ? "Sending"
          : status === ConvertStatus.SENT
          ? "Sent"
          : "Convert"}
      </Typography>
    </Box>
  );
};

const ConvertTokensHeaderStyles = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  padding: "0 16px",
  boxSizing: "border-box",
} as SxProps;

export default ConvertTokensHeader;
