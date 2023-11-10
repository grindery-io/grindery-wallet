import React from "react";
import { Box, SxProps } from "@mui/material";
import { useToken } from "../Token";

export type TokenAddressFormat = "full" | "short";

export type TokenAddressProps = {
  format?: TokenAddressFormat;
  sx?: SxProps | React.CSSProperties;
};

export const formatTokenAddress = (
  address: string,
  format: TokenAddressFormat
) => {
  switch (format) {
    case "full":
      return address;
    case "short":
      return `${address.slice(0, 6)}...${address.slice(-4)}`;
    default:
      return address;
  }
};

const TokenAddress = ({ format = "short", sx }: TokenAddressProps) => {
  const { address } = useToken();
  return address ? (
    <Box sx={sx} component="span">
      {formatTokenAddress(address, format)}
    </Box>
  ) : null;
};

export default TokenAddress;
