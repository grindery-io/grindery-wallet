import React from "react";
import TableRow from "../../TableRow";
import { TokenProps } from "../Token";

const TokenDetailsChain = ({ token }: TokenProps) => {
  return <TableRow label="Blockchain ID" value={token.chainId} />;
};

export default TokenDetailsChain;
