import React from "react";
import TableRow from "../../TableRow";
import TokenDecimals from "../../Token/TokenDecimals/TokenDecimals";

const TokenDetailsDecimals = () => {
  return <TableRow label="Decimals" value={<TokenDecimals />} />;
};

export default TokenDetailsDecimals;
