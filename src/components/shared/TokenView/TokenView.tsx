import React from "react";
import { Token as TokenStateType } from "../../../types/State";
import { Box } from "@mui/material";
import TokenHeader from "./TokenHeader";
import TokenCloseButton from "./TokenCloseButton";
import TokenDetails from "./TokenDetails/TokenDetails";
import TokenRemoveButton from "./TokenRemoveButton";
import { MAIN_TOKEN_ADDRESS } from "../../../constants";
import Token, { TokenType } from "../Token/Token";

export type TokenViewProps = {
  token: TokenStateType;
};

const TokenView = (props: TokenViewProps) => {
  const token: TokenType = {
    name: props.token.name,
    symbol: props.token.symbol,
    decimals: props.token.decimals,
    address: props.token.address,
    icon: props.token.logoURI,
    chain: props.token.chainId.toString(),
    balance: (props.token.balance || 0).toString(),
    price: (props.token.price || 0).toString(),
  };
  return (
    <Token token={token}>
      <Box sx={{ padding: "16px", width: "100%" }}>
        <TokenHeader />
        <TokenDetails />
        {props.token.address !== MAIN_TOKEN_ADDRESS && (
          <TokenRemoveButton {...props} />
        )}
        <TokenCloseButton />
      </Box>
    </Token>
  );
};

export default TokenView;
