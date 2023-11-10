import React from "react";
import { Stack } from "@mui/material";
import TokenViewTableSymbol from "./TokenViewTableSymbol";
import TokenViewTablePrice from "./TokenViewTablePrice";
import TokenViewTableDecimals from "./TokenViewTableDecimals";
import TokenViewTableAddress from "./TokenViewTableAddress";
import TokenViewTableChain from "./TokenViewTableChain";
import TokenViewTableBalance from "./TokenViewTableBalance";
import TokenViewTablePriceUpdated from "./TokenViewTablePriceUpdated";

const TokenViewTable = () => {
  return (
    <Stack
      alignItems="stretch"
      justifyContent="flex-start"
      sx={TokenViewTableStyles}
    >
      <TokenViewTableBalance />
      <TokenViewTableSymbol />
      <TokenViewTableChain />
      <TokenViewTableAddress />
      <TokenViewTableDecimals />
      <TokenViewTablePrice />
      <TokenViewTablePriceUpdated />
    </Stack>
  );
};

const TokenViewTableStyles = {
  borderRadius: "5px",
  border: "1px solid var(--gr-theme-divider-color)",
  width: "100%",
};

export default TokenViewTable;
