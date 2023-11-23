import React from "react";
import TableRow from "../../TableRow/TableRow";
import TokenPrice from "../../Token/TokenPrice/TokenPrice";

const TokenDetailsTablePrice = () => {
  return <TableRow label="Price" value={<TokenPrice />} />;
};

export default TokenDetailsTablePrice;
