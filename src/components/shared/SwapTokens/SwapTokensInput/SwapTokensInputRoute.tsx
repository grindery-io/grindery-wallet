import React from "react";
import Web3 from "web3";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import { selectAppStore, useAppSelector } from "../../../../store";
import { SwapStatus } from "../../../../types/State";
import { SwapTokensInputProps } from "./SwapTokensInput";

const SwapTokensInputRoute = ({ tokensIn }: SwapTokensInputProps) => {
  const {
    swap: { status, route, input },
    tokens,
  } = useAppSelector(selectAppStore);

  const isNothingFound =
    status === SwapStatus.WAITING &&
    input.amountIn &&
    input.tokenIn &&
    input.tokenOut &&
    !route;

  const lineaNativeToken = tokens.find(
    (token) =>
      token.address === "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee" &&
      token.chain === "59144"
  );

  const selectedTokenIn = tokensIn.find(
    (token) => token.address === input.tokenIn
  );

  const gasAmountWei = Number(route?.gas || 0);
  const isLineaChain = input.chainId === "59144";
  const nativeBalance = parseFloat(lineaNativeToken?.balance || "0");
  const isSwappingNative =
    selectedTokenIn?.address.toLowerCase() ===
    lineaNativeToken?.address?.toLowerCase();
  const amountInWei =
    parseFloat(input.amountIn) * 10 ** (selectedTokenIn?.decimals || 18);
  const amountAndGasWei = Number(gasAmountWei) + Number(amountInWei);
  const requiredNativeBalance = isSwappingNative
    ? amountAndGasWei
    : gasAmountWei;
  const enoughGas = isLineaChain && nativeBalance > requiredNativeBalance;

  const isRouteFound = status === SwapStatus.WAITING && route;

  const selectedTokenOut = tokensIn.find(
    (token) => token.address === input.tokenOut
  );

  return (
    <Stack
      width="100%"
      flex="1"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
    >
      {status === SwapStatus.LOADING ? (
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
                    parseFloat(route?.amountOut || "0") /
                    Math.pow(10, selectedTokenOut?.decimals || 18) /
                    parseFloat(input.amountIn)
                  ).toString()}{" "}
                  {selectedTokenOut?.symbol}
                </Typography>
              )}

              {input.chainId === "59144" ? (
                <Box>
                  <Typography>
                    Gas: {Web3.utils.fromWei(route?.gas || 0, "ether")} ETH
                  </Typography>
                  {!enoughGas && (
                    <Typography color="error" variant="sm">
                      Not enough balance to pay gas fees
                    </Typography>
                  )}
                </Box>
              ) : (
                <Typography>Grindery pays the gas fees for you 🥰</Typography>
              )}
            </>
          ) : (
            <Typography color="hint">
              {isNothingFound
                ? "No routes found"
                : "Select tokens and enter an amount to swap"}
            </Typography>
          )}
        </Stack>
      )}
    </Stack>
  );
};

export default SwapTokensInputRoute;
