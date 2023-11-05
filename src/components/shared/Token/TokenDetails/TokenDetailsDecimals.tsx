import React from "react";
import TableRow from "../../TableRow";
import { TokenProps } from "../Token";

const TokenDetailsDecimals = ({ token }: TokenProps) => {
  return <TableRow label="Decimals" value={token.decimals} />;
};

export default TokenDetailsDecimals;
