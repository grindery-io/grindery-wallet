import React from "react";
import SwapTokensInputButtons from "./SwapTokensInputButtons";
import SwapTokensInputTokenIn from "./SwapTokensInputTokenIn";
import SwapTokensInputTokenOut from "./SwapTokensInputTokenOut";
import SwapTokensInputRoute from "./SwapTokensInputRoute";
import SwapTokensInputArrow from "./SwapTokensInputArrow";
import { TokenType } from "../../Token";

export type SwapTokensInputProps = {
  allTokens: TokenType[];
};

const SwapTokensInput = ({ allTokens }: SwapTokensInputProps) => {
  return (
    <>
      <SwapTokensInputTokenIn allTokens={allTokens} />
      <SwapTokensInputArrow />
      <SwapTokensInputTokenOut allTokens={allTokens} />
      <SwapTokensInputRoute allTokens={allTokens} />
      <SwapTokensInputButtons allTokens={allTokens} />
    </>
  );
};

export default SwapTokensInput;
