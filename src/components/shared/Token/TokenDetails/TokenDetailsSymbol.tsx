import React from "react";
import TableRow from "../../TableRow";
import { TokenProps } from "../Token";

const TokenDetailsSymbol = ({ token }: TokenProps) => {
  return <TableRow label="Token symbol" value={token.symbol} />;
};

export default TokenDetailsSymbol;
