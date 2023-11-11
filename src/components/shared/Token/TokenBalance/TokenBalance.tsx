import React from "react";
import { Box, SxProps } from "@mui/material";
import { useToken } from "../Token";

export type TokenBalanceFormat = "eth" | "wei" | "usd" | "short";

export type TokenBalanceProps = {
  format?: TokenBalanceFormat;
  sx?: SxProps | React.CSSProperties;
};

export const formatTokenBalance = (
  format: TokenBalanceFormat,
  balance: string,
  price: string,
  decimals: number
) => {
  switch (format) {
    case "wei":
      return balance;
    case "eth":
      return (Number(balance) / 10 ** decimals).toString();
    case "usd":
      return ((Number(balance) / 10 ** decimals) * Number(price)).toFixed(2);
    case "short":
      return parseFloat(
        (Number(balance) / 10 ** decimals).toFixed(2)
      ).toLocaleString();
    default:
      return balance;
  }
};

const TokenBalance = ({ format = "eth", sx }: TokenBalanceProps) => {
  const { balance, price, decimals } = useToken();

  return balance ? (
    <Box sx={sx} component="span">
      {formatTokenBalance(format, balance, price, decimals)}
    </Box>
  ) : null;
};

export default TokenBalance;
