import React from "react";
import moment from "moment";
import { Box, SxProps } from "@mui/material";
import { useToken } from "../Token";

export type TokenPriceUpdatedFormat = "default" | "fromNow" | "timestamp";

export type TokenPriceUpdatedProps = {
  format?: TokenPriceUpdatedFormat;
  sx?: SxProps | React.CSSProperties;
};

export const formatTokenPriceUpdated = (
  date: string,
  format: TokenPriceUpdatedFormat
) => {
  switch (format) {
    case "default":
      return date;
    case "fromNow":
      return moment(date).fromNow();
    case "timestamp":
      return moment(date).unix();
    default:
      return date;
  }
};

const TokenPriceUpdated = ({
  format = "default",
  sx,
}: TokenPriceUpdatedProps) => {
  const { priceUpdated } = useToken();

  return (
    <Box sx={sx} component="span">
      {priceUpdated ? formatTokenPriceUpdated(priceUpdated, format) : "never"}
    </Box>
  );
};

export default TokenPriceUpdated;
