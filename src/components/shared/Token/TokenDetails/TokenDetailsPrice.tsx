import React from "react";
import TableRow from "../../TableRow";
import { TokenProps } from "../Token";
import { selectAppStore, useAppSelector } from "../../../../store";

const TokenDetailsPrice = ({ token }: TokenProps) => {
  const {
    debug: { features },
  } = useAppSelector(selectAppStore);
  return features?.TOKEN_PRICE ? (
    <TableRow label="Price" value={`${token.price || 0} USD`} />
  ) : null;
};

export default TokenDetailsPrice;
