import React from "react";
import { Box, SxProps } from "@mui/material";
import { useToken } from "../Token";

export type TokenPriceFormat = "default" | "full" | "short" | "$";

export type TokenPriceProps = {
  format?: TokenPriceFormat;
  sx?: SxProps | React.CSSProperties;
};

export const formatTokenPrice = (price: string, format: TokenPriceFormat) => {
  switch (format) {
    case "default":
      return price;
    case "full":
      return `${price} USD`;
    case "short":
      return `$${price}`;
    case "$":
      return `${price} US$`;
    default:
      return price;
  }
};

const TokenPrice = ({ format = "default", sx }: TokenPriceProps) => {
  const { price } = useToken();

  return price ? (
    <Box sx={sx} component="span">
      {formatTokenPrice(price, format)}
    </Box>
  ) : null;
};

export default TokenPrice;
