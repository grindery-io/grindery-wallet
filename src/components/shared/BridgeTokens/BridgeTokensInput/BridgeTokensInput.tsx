import React from "react";
import BridgeTokensInputButtons from "./BridgeTokensInputButtons";
import BridgeTokensInputTokenIn from "./BridgeTokensInputTokenIn";
import BridgeTokensInputTokenOut from "./BridgeTokensInputTokenOut";
import BridgeTokensInputQuote from "./BridgeTokensInputQuote";
import BridgeTokensInputArrow from "./BridgeTokensInputArrow";
import { TokenType } from "../../Token";

export type BridgeTokensInputProps = {
  allTokens: TokenType[];
};

const BridgeTokensInput = ({ allTokens }: BridgeTokensInputProps) => {
  return (
    <>
      <BridgeTokensInputTokenIn allTokens={allTokens} />
      <BridgeTokensInputArrow />
      <BridgeTokensInputTokenOut allTokens={allTokens} />
      <BridgeTokensInputQuote allTokens={allTokens} />
      <BridgeTokensInputButtons allTokens={allTokens} />
    </>
  );
};

export default BridgeTokensInput;
