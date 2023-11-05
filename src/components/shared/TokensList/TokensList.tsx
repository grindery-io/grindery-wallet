import React from "react";
import TokensListItem from "./TokensListItem";
import { selectAppStore, useAppSelector } from "../../../store";
import { Stack } from "@mui/material";
import TokensListImportButton from "./TokensListImportButton";

const TokensList = () => {
  const {
    tokens: { items },
  } = useAppSelector(selectAppStore);
  return (
    <Stack
      direction="column"
      alignItems="stretch"
      justifyContent="flex-start"
      style={TokensListStyles}
      useFlexGap
    >
      {items.map((token) => (
        <TokensListItem token={token} key={token.id} />
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
