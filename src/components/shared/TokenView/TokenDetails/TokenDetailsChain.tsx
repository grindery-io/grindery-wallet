import React from "react";
import TableRow from "../../TableRow";
import TokenChain from "../../Token/TokenChain";

const TokenDetailsChain = () => {
  return <TableRow label="Blockchain ID" value={<TokenChain format="id" />} />;
};

export default TokenDetailsChain;
