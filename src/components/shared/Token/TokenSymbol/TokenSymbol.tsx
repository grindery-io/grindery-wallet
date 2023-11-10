import React from "react";
import { Box, SxProps } from "@mui/material";
import { useToken } from "../Token";

export type TokenSymbolProps = {
  sx?: SxProps | React.CSSProperties;
};

const TokenSymbol = ({ sx }: TokenSymbolProps) => {
  const { symbol } = useToken();
  return symbol ? (
    <Box sx={sx} component="span">
      {symbol}
    </Box>
  ) : null;
};

export default TokenSymbol;
