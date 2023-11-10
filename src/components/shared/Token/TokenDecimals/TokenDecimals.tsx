import React from "react";
import { Box, SxProps } from "@mui/material";
import { useToken } from "../Token";

export type TokenDecimalsProps = {
  sx?: SxProps | React.CSSProperties;
};

const TokenDecimals = ({ sx }: TokenDecimalsProps) => {
  const { decimals } = useToken();
  return decimals ? (
    <Box sx={sx} component="span">
      {decimals.toString()}
    </Box>
  ) : null;
};

export default TokenDecimals;
