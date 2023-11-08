import React from "react";
import { Stack } from "@mui/material";
import { TokenProps } from "../Token";
import TokenDetailsSymbol from "./TokenDetailsSymbol";
import TokenDetailsBalance from "./TokenDetailsBalance";
import TokenDetailsChain from "./TokenDetailsChain";
import TokenDetailsAddress from "./TokenDetailsAddress";
import TokenDetailsDecimals from "./TokenDetailsDecimals";
import TokenDetailsPrice from "./TokenDetailsPrice";

const TokenDetails = (props: TokenProps) => {
  return (
    <Stack
      alignItems="stretch"
      justifyContent="flex-start"
      sx={TokenDetailsStyles}
    >
      <TokenDetailsBalance {...props} />
      <TokenDetailsSymbol {...props} />
      <TokenDetailsChain {...props} />
      <TokenDetailsAddress {...props} />
      <TokenDetailsDecimals {...props} />
      <TokenDetailsPrice {...props} />
    </Stack>
  );
};

const TokenDetailsStyles = {
  borderRadius: "5px",
  border: "1px solid var(--gr-theme-divider-color)",
  width: "100%",
};

export default TokenDetails;
