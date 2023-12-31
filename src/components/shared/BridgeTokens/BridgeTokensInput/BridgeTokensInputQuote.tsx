import React from "react";
import { CircularProgress, Stack, Typography } from "@mui/material";
import { selectAppStore, useAppSelector } from "../../../../store";
import { BridgeStatus } from "../../../../types/State";
import { BridgeTokensInputProps } from "./BridgeTokensInput";

const BridgeTokensInputQuote = ({ tokensIn }: BridgeTokensInputProps) => {
  const {
    bridge: { status, quote, input },
  } = useAppSelector(selectAppStore);

  const isNothingFound =
    status === BridgeStatus.WAITING &&
    input.amountIn &&
    input.tokenIn &&
    input.tokenOut &&
    input.chainIn &&
    input.chainOut &&
    !quote;

  const isRouteFound = status === BridgeStatus.WAITING && quote;

  const selectedTokenIn = tokensIn.find(
    (token) => token.address === input.tokenIn && token.chain === input.chainIn
  );

  const selectedTokenOut = tokensIn.find(
    (token) =>
      token.address === input.tokenOut && token.chain === input.chainOut
  );

  return (
    <Stack
      width="100%"
      flex="1"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
    >
      {status === BridgeStatus.LOADING ? (
        <>
          <CircularProgress
            size={32}
            sx={{
              color: "var(--tg-theme-button-color, #2481cc)",
              marginBottom: "20px",
            }}
          />

          <Typography>Searching best route...</Typography>
        </>
      ) : (
        <Stack
          flex="1"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          spacing="16px"
          useFlexGap
        >
          {isRouteFound ? (
            <>
              {selectedTokenIn && selectedTokenOut && (
                <Typography fontWeight="bold">
                  1 {selectedTokenIn?.symbol} ={" "}
                  {(
                    parseFloat(quote?.estimate.toAmount || "0") /
                    Math.pow(10, selectedTokenOut?.decimals || 18) /
                    parseFloat(input.amountIn)
                  ).toString()}{" "}
                  {selectedTokenOut?.symbol}
                </Typography>
              )}
              <Typography>Grindery pays the gas fees for you 🥰</Typography>
            </>
          ) : (
            <Typography color="hint">
              {isNothingFound
                ? "No routes found"
                : "Select tokens and enter an amount to bridge"}
            </Typography>
          )}
        </Stack>
      )}
    </Stack>
  );
};

export default BridgeTokensInputQuote;
