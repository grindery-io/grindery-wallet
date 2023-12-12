import React from "react";
import { Box, SxProps, Typography } from "@mui/material";

const ConvertTokensHeader = () => {
  return (
    <Box sx={ConvertTokensHeaderStyles}>
      <Typography textAlign="center">Pre-order</Typography>
    </Box>
  );
};

const ConvertTokensHeaderStyles = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  padding: "16px 16px 0",
  boxSizing: "border-box",
} as SxProps;

export default ConvertTokensHeader;
