import React from "react";
import TableRow from "../../TableRow/TableRow";
import TokenSymbol from "../../Token/TokenSymbol/TokenSymbol";

const TokenDetailsTableSymbol = () => {
  return <TableRow label="Token symbol" value={<TokenSymbol />} />;
};

export default TokenDetailsTableSymbol;
