import React, { useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { SwapStatus } from "../../../../types/State";
import {
  appStoreActions,
  selectAppStore,
  useAppDispatch,
  useAppSelector,
} from "../../../../store";
import { swapTokensRequest } from "../../../../services/swap";
import { SwapTokensInputProps } from "./SwapTokensInput";

const SwapTokensInputButtons = ({ allTokens }: SwapTokensInputProps) => {
  let navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    swap: { input, status, route },
  } = useAppSelector(selectAppStore);

  const selectedTokenIn = allTokens.find(
    (token) => token.address === input.tokenIn
  );

  const [countFailed, setCountFailed] = useState(0);

  const swapTokens = async () => {
    if (
      !/^-?\d*(\.\d+)?$/.test(input.amountIn) ||
      parseFloat(input.amountIn) <= 0
    ) {
      dispatch(
        appStoreActions.setSwap({
          status: SwapStatus.ERROR,
        })
      );
      return;
    }
    if (!input.tokenOut || !input.tokenIn) {
      return;
    }
    if (countFailed > 3) {
      return;
    }
    dispatch(
      appStoreActions.setSwap({
        status: SwapStatus.SENDING,
      })
    );
    try {
      const res = await swapTokensRequest({
        to: route?.tx.to,
        data: route?.tx.data,
        value: route?.tx.value,
        tokenIn: input.tokenIn,
        amountIn: input.amountIn,
        tokenOut: input.tokenOut,
        amountOut: route?.amountOut || "0",
        gas: route?.gas.toString() || "0",
        priceImpact: route?.priceImpact.toString() || "0",
        chainId: input.chainId || "137",
      });

      dispatch(
        appStoreActions.setSwap({
          status: res.data?.success ? SwapStatus.SENT : SwapStatus.ERROR,
        })
      );
    } catch (error) {
      console.error("swap tokens error", error);
      setCountFailed(countFailed + 1);
      dispatch(
        appStoreActions.setSwap({
          status: SwapStatus.ERROR,
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
            status === SwapStatus.SENDING ||
            status === SwapStatus.LOADING ||
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
            const message = `You are going to swap ${input.amountIn} ${selectedTokenIn?.symbol}. This action can not be undone. Are you sure?`;
            if (window.Telegram?.WebApp?.showConfirm) {
              window.Telegram?.WebApp?.showConfirm(
                message,
                (confirmed: boolean) => {
                  if (confirmed) {
                    swapTokens();
                  }
                }
              );
            } else {
              const confirmed = window.confirm(message);
              if (confirmed) {
                swapTokens();
              }
            }
          }}
        >
          {countFailed > 3
            ? "Try later..."
            : status === SwapStatus.SENDING
            ? "Swapping..."
            : "Swap"}
        </Button>
      </Stack>
      <Typography
        color="hint"
        variant="xs"
        textAlign="center"
        margin="10px 0 0px"
      >
        Powered by{" "}
        <a href="https://www.enso.finance/" target="_blank" rel="noreferrer">
          Enso
        </a>
      </Typography>
    </Box>
  );
};

export default SwapTokensInputButtons;
