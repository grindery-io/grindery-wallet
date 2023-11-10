import React from "react";
import { Box } from "@mui/material";
import { MAIN_TOKEN_ADDRESS } from "../../../constants";
import Token, { TokenType } from "../Token/Token";
import TokenViewRemoveButton from "./TokenViewRemoveButton/TokenViewRemoveButton";
import TokenViewCloseButton from "./TokenViewCloseButton/TokenViewCloseButton";
import TokenViewTable from "./TokenViewTable/TokenViewTable";
import TokenViewHeader from "./TokenViewHeader/TokenViewHeader";

export type TokenViewProps = {
  token: TokenType;
};

const TokenView = (props: TokenViewProps) => {
  return (
    <Token token={props.token}>
      <Box sx={{ padding: "16px", width: "100%" }}>
        <TokenViewHeader />
        <TokenViewTable />
        {props.token.address !== MAIN_TOKEN_ADDRESS && (
          <TokenViewRemoveButton {...props} />
        )}
        <TokenViewCloseButton />
      </Box>
    </Token>
  );
};

export default TokenView;
