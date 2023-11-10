import React from "react";
import TableRow from "../../TableRow";
import { selectAppStore, useAppSelector } from "../../../../store";
import TokenPrice from "../../Token/TokenPrice/TokenPrice";

const TokenViewTablePrice = () => {
  const {
    debug: { features },
  } = useAppSelector(selectAppStore);

  return features?.TOKEN_PRICE ? (
    <TableRow label="Price" value={<TokenPrice format="full" />} />
  ) : null;
};

export default TokenViewTablePrice;
