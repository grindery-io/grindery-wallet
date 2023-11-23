import React from "react";
import { Box } from "@mui/material";
import { MAIN_TOKEN_ADDRESS } from "../../../constants";
import Token, { TokenType } from "../Token/Token";
import TokenDetailsRemoveButton from "./TokenDetailsRemoveButton/TokenDetailsRemoveButton";
import TokenDetailsCloseButton from "./TokenDetailsCloseButton/TokenDetailsCloseButton";
import TokenDetailsTable from "./TokenDetailsTable/TokenDetailsTable";
import TokenDetailsHeader from "./TokenDetailsHeader/TokenDetailsHeader";

export type TokenDetailsProps = {
  token: TokenType;
};

const TokenDetails = (props: TokenDetailsProps) => {
  return (
    <Token token={props.token}>
      <Box sx={{ padding: "16px", width: "100%" }}>
        <TokenDetailsHeader />
        <TokenDetailsTable />
        {props.token.address !== MAIN_TOKEN_ADDRESS && (
          <TokenDetailsRemoveButton {...props} />
        )}
        <TokenDetailsCloseButton />
      </Box>
    </Token>
  );
};

export default TokenDetails;
