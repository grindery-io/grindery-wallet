import React from "react";
import TableRow from "../../TableRow/TableRow";
import TokenChain from "../../Token/TokenChain/TokenChain";

const TokenViewTableChain = () => {
  return <TableRow label="Blockchain ID" value={<TokenChain format="id" />} />;
};

export default TokenViewTableChain;
