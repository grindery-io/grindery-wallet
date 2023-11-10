import React from "react";
import TableRow from "../../TableRow";
import TokenSymbol from "../../Token/TokenSymbol/TokenSymbol";

const TokenViewTableSymbol = () => {
  return <TableRow label="Token symbol" value={<TokenSymbol />} />;
};

export default TokenViewTableSymbol;
