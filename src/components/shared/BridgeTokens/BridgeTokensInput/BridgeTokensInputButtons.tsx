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

const BridgeTokensInputButtons = ({ allTokens }: BridgeTokensInputProps) => {
  let navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    bridge: { input, status, route },
  } = useAppSelector(selectAppStore);

  const selectedTokenIn = allTokens.find(
    (token) => token.address === input.tokenIn
  );

  const [countFailed, setCountFailed] = useState(0);

  const bridgeTokens = async () => {
    if (
      !/^-?\d*(\.\d+)?$/.test(input.amountIn) ||
      parseFloat(input.amountIn) <= 0
    ) {
      dispatch(
        appStoreActions.setBridge({
          status: BridgeStatus.ERROR,
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
      appStoreActions.setBridge({
        status: BridgeStatus.SENDING,
      })
    );
    try {
      const res = await bridgeTokensRequest({
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
        <a href="https://www.enso.finance/" target="_blank" rel="noreferrer">
          Enso
        </a>
      </Typography>
    </Box>
  );
};

export default BridgeTokensInputButtons;
