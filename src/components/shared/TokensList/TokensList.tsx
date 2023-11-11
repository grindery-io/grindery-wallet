import React from "react";
import TokensListItem from "./TokensListItem";
import { selectAppStore, useAppSelector } from "../../../store";
import { Stack } from "@mui/material";
import TokensListImportButton from "./TokensListImportButton";
import { mockedToken } from "../Token/mockedToken";
import { sortTokens } from "../../../utils/sortTokens";

const TokensList = () => {
  const { tokensNew } = useAppSelector(selectAppStore);
  const tokens =
    tokensNew.length > 0
      ? sortTokens(tokensNew)
      : [
          {
            ...mockedToken,
            balance: "0",
            price: "0",
            priceUpdated: new Date().toString(),
          },
        ];
  return (
    <Stack
      direction="column"
      alignItems="stretch"
      justifyContent="flex-start"
      style={TokensListStyles}
      useFlexGap
    >
      {tokens.map((token) => (
        <TokensListItem token={token} key={token.address} />
      ))}
      <TokensListImportButton />
    </Stack>
  );
};

const TokensListStyles: React.CSSProperties = {
  margin: "8px",
  width: "calc(100% - 16px)",
};

export default TokensList;
