import React from "react";
import TableRow from "../../TableRow";
import { TokenProps } from "../Token";

const TokenDetailsBalance = ({ token }: TokenProps) => {
  return (
    <TableRow
      first
      label="Balance"
      value={(token.balance || 0).toLocaleString()}
    />
  );
};

export default TokenDetailsBalance;
