import React from "react";
import SwapTokensInputButtons from "./SwapTokensInputButtons";
import SwapTokensInputTokenIn from "./SwapTokensInputTokenIn";
import SwapTokensInputTokenOut from "./SwapTokensInputTokenOut";
import SwapTokensInputRoute from "./SwapTokensInputRoute";
import { Token } from "../../../../types/State";
import SwapTokensInputArrow from "./SwapTokensInputArrow";

const SwapTokensInput = ({ allTokens }: { allTokens: Token[] }) => {
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
