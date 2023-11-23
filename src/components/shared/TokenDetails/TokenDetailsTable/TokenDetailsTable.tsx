import React from "react";
import { Stack } from "@mui/material";
import TokenDetailsTableSymbol from "./TokenDetailsTableSymbol";
import TokenDetailsTablePrice from "./TokenDetailsTablePrice";
import TokenDetailsTableDecimals from "./TokenDetailsTableDecimals";
import TokenDetailsTableAddress from "./TokenDetailsTableAddress";
import TokenDetailsTableChain from "./TokenDetailsTableChain";
import TokenDetailsTableBalance from "./TokenDetailsTableBalance";
import TokenDetailsTablePriceUpdated from "./TokenDetailsTablePriceUpdated";

const TokenDetailsTable = () => {
  return (
    <Stack
      alignItems="stretch"
      justifyContent="flex-start"
      sx={TokenDetailsTableStyles}
    >
      <TokenDetailsTableBalance />
      <TokenDetailsTableSymbol />
      <TokenDetailsTableChain />
      <TokenDetailsTableAddress />
      <TokenDetailsTableDecimals />
      <TokenDetailsTablePrice />
      <TokenDetailsTablePriceUpdated />
    </Stack>
  );
};

const TokenDetailsTableStyles = {
  borderRadius: "5px",
  border: "1px solid var(--gr-theme-divider-color)",
  width: "100%",
};

export default TokenDetailsTable;
