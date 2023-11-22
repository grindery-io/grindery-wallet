import React from "react";
import TableRow from "../../TableRow/TableRow";
import TokenChain from "../../Token/TokenChain/TokenChain";

const TokenViewTableChain = () => {
  return (
    <TableRow
      label="Blockchain"
      value={<TokenChain withIcon iconSize={20} />}
    />
  );
};

export default TokenViewTableChain;
