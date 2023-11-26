import React, { useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { BridgeStatus } from "../../../../types/State";
import {
  appStoreActions,
  selectAppStore,
  useAppDispatch,
  useAppSelector,
} from "../../../../store";
import { BridgeTokensInputProps } from "./BridgeTokensInput";
import { swapTokensRequest } from "services";

const BridgeTokensInputButtons = ({ tokensIn }: BridgeTokensInputProps) => {
  let navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    bridge: { input, status, quote },
  } = useAppSelector(selectAppStore);

  const selectedTokenIn = tokensIn.find(
    (token) => token.address === input.tokenIn
  );

  const [countFailed, setCountFailed] = useState(0);

  const bridgeTokens = async () => {
    if (isNaN(parseFloat(input.amountIn)) || parseFloat(input.amountIn) <= 0) {
      dispatch(
        appStoreActions.setBridge({
          status: BridgeStatus.ERROR,
        })
      );
      return;
    }
    if (
      !input.tokenOut ||
      !input.tokenIn ||
      !input.chainIn ||
      !input.chainOut ||
      !quote
    ) {
      return;
    }
    if (countFailed > 3) {
      return;
    }
    dispatch(
      appStoreActions.setBridge({
        status: BridgeStatus.SENDING,
      })
    );

    try {
      const res = await swapTokensRequest({
        to: quote.transactionRequest.to,
        data: quote.transactionRequest.data,
        value: quote.transactionRequest.value,
        tokenIn: input.tokenIn,
        amountIn: input.amountIn,
        tokenOut: input.tokenOut,
        amountOut: quote.estimate.toAmount,
        gas: quote.transactionRequest.gasPrice,
        priceImpact: "0",
        chainId: input.chainIn || "137",
      });

      dispatch(
        appStoreActions.setBridge({
          status: res.data?.success ? BridgeStatus.SENT : BridgeStatus.ERROR,
        })
      );
    } catch (error) {
      console.error("bridge tokens error", error);
      setCountFailed(countFailed + 1);
      dispatch(
        appStoreActions.setBridge({
          status: BridgeStatus.ERROR,
        })
      );
    }
  };

  return (
    <Box mt="auto" mb="10px">
      <Stack
        direction="row"
        spacing="16px"
        bgcolor="var(--tg-theme-bg-color, #ffffff)"
      >
        <Button
          variant="outlined"
          onClick={() => {
            navigate(-1);
          }}
          size="large"
          fullWidth
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          fullWidth
          disabled={
            !quote ||
            status === BridgeStatus.SENDING ||
            status === BridgeStatus.LOADING ||
            !input.amountIn ||
            !input.tokenIn ||
            !input.tokenOut ||
            countFailed > 3 ||
            parseFloat(input.amountIn) >
              parseFloat(selectedTokenIn?.balance || "0") /
                10 ** (selectedTokenIn?.decimals || 18)
          }
          size="large"
          onClick={() => {
            const message = `You are going to bridge ${input.amountIn} ${selectedTokenIn?.symbol}. This action can not be undone. Are you sure?`;
            if (window.Telegram?.WebApp?.showConfirm) {
              window.Telegram?.WebApp?.showConfirm(
                message,
                (confirmed: boolean) => {
                  if (confirmed) {
                    bridgeTokens();
                  }
                }
              );
            } else {
              const confirmed = window.confirm(message);
              if (confirmed) {
                bridgeTokens();
              }
            }
          }}
        >
          {countFailed > 3
            ? "Try later..."
            : status === BridgeStatus.SENDING
            ? "Bridgeping..."
            : "Bridge"}
        </Button>
      </Stack>
      <Typography
        color="hint"
        variant="xs"
        textAlign="center"
        margin="10px 0 0px"
      >
        Powered by{" "}
        <a href="https://li.fi/" target="_blank" rel="noreferrer">
          LI.FI
        </a>
      </Typography>
    </Box>
  );
};

export default BridgeTokensInputButtons;
