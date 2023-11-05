import React from "react";
import { Token as TokenType } from "../../../types/State";
import { Box } from "@mui/material";
import TokenHeader from "./TokenHeader";
import TokenCloseButton from "./TokenCloseButton";
import TokenDetails from "./TokenDetails/TokenDetails";

export type TokenProps = {
  token: TokenType;
};

const Token = (props: TokenProps) => {
  return (
    <Box sx={{ padding: "16px", width: "100%" }}>
      <TokenHeader {...props} />
      <TokenDetails {...props} />
      <TokenCloseButton />
    </Box>
  );
};

export default Token;
