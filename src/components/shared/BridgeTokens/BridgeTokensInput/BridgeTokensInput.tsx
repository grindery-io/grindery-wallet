import React from "react";
import BridgeTokensInputButtons from "./BridgeTokensInputButtons";
import BridgeTokensInputTokenIn from "./BridgeTokensInputTokenIn";
import BridgeTokensInputTokenOut from "./BridgeTokensInputTokenOut";
import BridgeTokensInputQuote from "./BridgeTokensInputQuote";
import BridgeTokensInputArrow from "./BridgeTokensInputArrow";
import { TokenType } from "../../Token";

export type BridgeTokensInputProps = {
  tokensIn: TokenType[];
  tokensOut?: TokenType[];
};

const BridgeTokensInput = ({ tokensIn, tokensOut }: BridgeTokensInputProps) => {
  return (
    <>
      <BridgeTokensInputTokenIn tokensIn={tokensIn} />
      <BridgeTokensInputArrow />
      <BridgeTokensInputTokenOut tokensOut={tokensOut || []} />
      <BridgeTokensInputQuote tokensIn={tokensIn} />
      <BridgeTokensInputButtons tokensIn={tokensIn} />
    </>
  );
};

export default BridgeTokensInput;
