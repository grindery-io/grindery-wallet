import React from "react";
import SwapTokensInputButtons from "./SwapTokensInputButtons";
import SwapTokensInputTokenIn from "./SwapTokensInputTokenIn";
import SwapTokensInputTokenOut from "./SwapTokensInputTokenOut";
import SwapTokensInputRoute from "./SwapTokensInputRoute";
import SwapTokensInputArrow from "./SwapTokensInputArrow";
import { TokenType } from "../../Token";
import { selectAppStore, useAppSelector } from "store";
import SwapTokensInputChain from "./SwapTokensInputChain";

export type SwapTokensInputProps = {
  tokensIn: TokenType[];
};

const SwapTokensInput = ({ tokensIn }: SwapTokensInputProps) => {
  const {
    debug: { enabled, features },
  } = useAppSelector(selectAppStore);

  return (
    <>
      {enabled && features?.MULTICHAIN && <SwapTokensInputChain />}
      <SwapTokensInputTokenIn tokensIn={tokensIn} />
      <SwapTokensInputArrow />
      <SwapTokensInputTokenOut tokensIn={tokensIn} />
      <SwapTokensInputRoute tokensIn={tokensIn} />
      <SwapTokensInputButtons tokensIn={tokensIn} />
    </>
  );
};

export default SwapTokensInput;
