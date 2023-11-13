import React from "react";
import TableRow from "../../TableRow";
import TokenPriceUpdated from "../../Token/TokenPriceUpdated/TokenPriceUpdated";

const TokenViewTablePriceUpdated = () => {
  return (
    <TableRow
      label="Price updated"
      value={<TokenPriceUpdated format="fromNow" />}
    />
  );
};

export default TokenViewTablePriceUpdated;
