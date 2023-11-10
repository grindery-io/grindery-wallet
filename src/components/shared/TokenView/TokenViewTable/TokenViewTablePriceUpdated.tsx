import React from "react";
import TableRow from "../../TableRow";
import { selectAppStore, useAppSelector } from "../../../../store";
import TokenPriceUpdated from "../../Token/TokenPriceUpdated/TokenPriceUpdated";

const TokenViewTablePriceUpdated = () => {
  const {
    debug: { features },
  } = useAppSelector(selectAppStore);

  return features?.TOKEN_PRICE ? (
    <TableRow
      label="Price updated"
      value={<TokenPriceUpdated format="fromNow" />}
    />
  ) : null;
};

export default TokenViewTablePriceUpdated;
