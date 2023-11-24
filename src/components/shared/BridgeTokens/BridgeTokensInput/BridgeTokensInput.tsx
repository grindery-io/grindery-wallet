import React from "react";
import BridgeTokensInputButtons from "./BridgeTokensInputButtons";
import BridgeTokensInputTokenIn from "./BridgeTokensInputTokenIn";
import BridgeTokensInputTokenOut from "./BridgeTokensInputTokenOut";
import BridgeTokensInputRoute from "./BridgeTokensInputRoute";
import BridgeTokensInputArrow from "./BridgeTokensInputArrow";
import { TokenType } from "../../Token";
import { selectAppStore, useAppSelector } from "store";
import BridgeTokensInputChain from "./BridgeTokensInputChain";

export type BridgeTokensInputProps = {
  allTokens: TokenType[];
};

const BridgeTokensInput = ({ allTokens }: BridgeTokensInputProps) => {
  const {
    debug: { enabled, features },
  } = useAppSelector(selectAppStore);

  return (
    <>
      {enabled && features?.MULTICHAIN && <BridgeTokensInputChain />}
      <BridgeTokensInputTokenIn allTokens={allTokens} />
      <BridgeTokensInputArrow />
      <BridgeTokensInputTokenOut allTokens={allTokens} />
      <BridgeTokensInputRoute allTokens={allTokens} />
      <BridgeTokensInputButtons allTokens={allTokens} />
    </>
  );
};

export default BridgeTokensInput;
