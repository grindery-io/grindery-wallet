import React from "react";
import ConvertTokensInputButtons from "./ConvertTokensInputButtons";
import ConvertTokensInputTokenIn from "./ConvertTokensInputTokenIn";
import ConvertTokensInputTokenOut from "./ConvertTokensInputTokenOut";
import ConvertTokensInputQuote from "./ConvertTokensInputQuote";
import ConvertTokensInputArrow from "./ConvertTokensInputArrow";
import { TokenType } from "../../Token";

export type ConvertTokensInputProps = {
  tokensIn: TokenType[];
  tokensOut?: TokenType[];
};

const ConvertTokensInput = ({
  tokensIn,
  tokensOut,
}: ConvertTokensInputProps) => {
  return (
    <>
      <ConvertTokensInputTokenIn tokensIn={tokensIn} />
      <ConvertTokensInputArrow />
      <ConvertTokensInputTokenOut tokensOut={tokensOut || []} />
      <ConvertTokensInputQuote tokensIn={tokensIn} />
      <ConvertTokensInputButtons tokensIn={tokensIn} />
    </>
  );
};

export default ConvertTokensInput;
