import React from "react";
import { Box, SxProps } from "@mui/material";
import { useToken } from "../Token";
import { BLOCKCHAIN_NAMES } from "../../../../constants";

export type TokenChainFormat = "id" | "caip" | "name";

export type TokenChainProps = {
  format?: TokenChainFormat;
  sx?: SxProps | React.CSSProperties;
};

export const formatTokenChain = (chain: string, format: TokenChainFormat) => {
  switch (format) {
    case "id":
      return chain;
    case "caip":
      return `eip155:${chain}`;
    case "name":
      return BLOCKCHAIN_NAMES[chain];
    default:
      return chain;
  }
};

const TokenChain = ({ format = "name", sx }: TokenChainProps) => {
  const { chain } = useToken();
  return chain ? (
    <Box sx={sx} component="span">
      {formatTokenChain(chain, format)}
    </Box>
  ) : null;
};

export default TokenChain;
