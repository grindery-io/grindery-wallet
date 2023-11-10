import React from "react";
import TableRow from "../../TableRow";
import TokenBalance from "../../Token/TokenBalance/TokenBalance";

const TokenDetailsBalance = () => {
  return (
    <TableRow
      first
      label="Balance"
      value={<TokenBalance format="eth" sx={{ fontWeight: "bold" }} />}
    />
  );
};

export default TokenDetailsBalance;
