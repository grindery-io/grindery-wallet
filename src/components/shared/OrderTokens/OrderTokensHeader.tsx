import React from "react";
import { Box, SxProps, Typography } from "@mui/material";

const OrderTokensHeader = () => {
  return (
    <Box sx={OrderTokensHeaderStyles}>
      <Typography textAlign="center" variant="xl" fontWeight="bold">
        Pre-order
      </Typography>
    </Box>
  );
};

const OrderTokensHeaderStyles = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  padding: "16px 16px 0",
  boxSizing: "border-box",
} as SxProps;

export default OrderTokensHeader;
