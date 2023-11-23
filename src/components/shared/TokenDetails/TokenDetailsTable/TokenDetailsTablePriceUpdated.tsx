import React from "react";
import TableRow from "../../TableRow/TableRow";
import TokenPriceUpdated from "../../Token/TokenPriceUpdated/TokenPriceUpdated";

const TokenDetailsTablePriceUpdated = () => {
  return (
    <TableRow
      label="Price updated"
      value={<TokenPriceUpdated format="fromNow" />}
    />
  );
};

export default TokenDetailsTablePriceUpdated;
