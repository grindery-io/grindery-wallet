import React from "react";
import { TOKENS } from "../../../constants";
import TokensListItem from "./TokensListItem";

const TokensList = () => {
  return (
    <ul style={TokensListStyles}>
      {TOKENS.map((token) => (
        <TokensListItem token={token} key={token.symbol} />
      ))}
    </ul>
  );
};

const TokensListStyles: React.CSSProperties = {
  margin: "16px",
  padding: 0,
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  alignItems: "stretch",
  justifyContent: "flex-start",
  width: "calc(100% - 32px)",
  flexWrap: "nowrap",
};

export default TokensList;
