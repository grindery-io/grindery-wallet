import React from "react";
import TableRow from "../../TableRow/TableRow";
import TokenBalance from "../../Token/TokenBalance/TokenBalance";

const TokenDetailsTableBalance = () => {
  return (
    <TableRow
      first
      label="Balance"
      value={<TokenBalance format="eth" sx={{ fontWeight: "bold" }} />}
    />
  );
};

export default TokenDetailsTableBalance;
