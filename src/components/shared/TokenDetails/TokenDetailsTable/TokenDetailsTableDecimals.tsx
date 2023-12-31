import React from "react";
import TableRow from "../../TableRow/TableRow";
import TokenDecimals from "../../Token/TokenDecimals/TokenDecimals";

const TokenDetailsTableDecimals = () => {
  return <TableRow label="Decimals" value={<TokenDecimals />} />;
};

export default TokenDetailsTableDecimals;
