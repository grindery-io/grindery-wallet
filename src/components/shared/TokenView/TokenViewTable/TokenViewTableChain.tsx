import React from "react";
import TableRow from "../../TableRow/TableRow";
import TokenChain from "../../Token/TokenChain/TokenChain";
import { useToken } from "components/shared/Token/Token";
import Chain from "components/shared/Chain/Chain";
import ChainName from "components/shared/Chain/ChainName/ChainName";

const TokenViewTableChain = () => {
  const token = useToken();
  const { chain } = token;
  return (
    <TableRow
      label="Blockchain"
      value={
        chain ? (
          <Chain id={chain}>
            <ChainName />
          </Chain>
        ) : (
          <TokenChain format="id" />
        )
      }
    />
  );
};

export default TokenViewTableChain;
