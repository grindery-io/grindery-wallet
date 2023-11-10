import React from "react";
import TableRow from "../../TableRow";
import TokenSymbol from "../../Token/TokenSymbol";

const TokenDetailsSymbol = () => {
  return <TableRow label="Token symbol" value={<TokenSymbol />} />;
};

export default TokenDetailsSymbol;
