import React from "react";
import { Box, SxProps } from "@mui/material";
import { ChainType, useChain } from "../Chain";

export type ChainNameFormat = "default" | "full";

export type ChainNameProps = {
  format?: ChainNameFormat;
  sx?: SxProps | React.CSSProperties;
};

export const formatChainName = (chain: ChainType, format: ChainNameFormat) => {
  switch (format) {
    case "default":
      return chain.label;
    case "full":
      return chain.label + (chain.testnet ? " testnet" : " mainnet");
    default:
      return chain.label;
  }
};

const ChainName = ({ format = "default", sx }: ChainNameProps) => {
  const chain = useChain();

  const name = chain ? formatChainName(chain, format) : null;

  return name ? (
    <Box sx={sx} component="span">
      {name}
    </Box>
  ) : null;
};

export default ChainName;
