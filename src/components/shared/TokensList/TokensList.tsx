import React from "react";
import TokensListItem from "./TokensListItem/TokensListItem";
import { selectAppStore, useAppSelector } from "../../../store";
import { Stack } from "@mui/material";
import TokensListImportButton from "./TokensListImportButton/TokensListImportButton";
import { sortTokens } from "../../../utils/sortTokens";
import { GRINDERY_ONE_TOKEN } from "../../../constants";

const TokensList = () => {
  const { tokens: stateTokens } = useAppSelector(selectAppStore);
  const tokens =
    stateTokens.length > 0
      ? sortTokens(stateTokens)
      : [
          {
            ...GRINDERY_ONE_TOKEN,
            priceUpdated: new Date().toISOString(),
          },
        ];
  return (
    <>
      <Stack
        direction="column"
        alignItems="stretch"
        justifyContent="flex-start"
        style={TokensListStyles}
        useFlexGap
        data-testid="tokens-list"
      >
        {tokens.map((token) => (
          <TokensListItem token={token} key={token.address} />
        ))}
        <TokensListImportButton />
      </Stack>
    </>
  );
};

const TokensListStyles: React.CSSProperties = {
  margin: "8px",
  width: "calc(100% - 16px)",
};

export default TokensList;
