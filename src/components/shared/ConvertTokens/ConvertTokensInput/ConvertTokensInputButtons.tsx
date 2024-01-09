import React, { useState } from "react";
import { Box, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router";
import { ConvertStatus } from "../../../../types/State";
import {
  appStoreActions,
  selectAppStore,
  useAppDispatch,
  useAppSelector,
} from "../../../../store";
import { ConvertTokensInputProps } from "./ConvertTokensInput";
import { GetBridgeQuoteResponseType, bridgeTokensRequest } from "services";

const ConvertTokensInputButtons = ({ tokensIn }: ConvertTokensInputProps) => {
  let navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    convert: { input, status, quote },
  } = useAppSelector(selectAppStore);

  const selectedTokenIn = tokensIn.find(
    (token) => token.address === input.tokenIn
  );

  const [countFailed, setCountFailed] = useState(0);

  const convertTokens = async () => {
    if (isNaN(parseFloat(input.amountIn)) || parseFloat(input.amountIn) <= 0) {
      dispatch(
        appStoreActions.setConvert({
          status: ConvertStatus.ERROR,
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
      appStoreActions.setConvert({
        status: ConvertStatus.SENDING,
      })
    );

    try {
      await bridgeTokensRequest({
        to: (quote as GetBridgeQuoteResponseType).transactionRequest.to,
        data: (quote as GetBridgeQuoteResponseType).transactionRequest.data,
        value: (quote as GetBridgeQuoteResponseType).transactionRequest.value,
        tokenIn: input.tokenIn,
        amountIn: input.amountIn,
        tokenOut: input.tokenOut,
        amountOut: (quote as GetBridgeQuoteResponseType).estimate.toAmount,
        gas: (quote as GetBridgeQuoteResponseType).transactionRequest.gasPrice,
        priceImpact: "0",
        chainIn: input.chainIn || "137",
        chainOut: input.chainOut || "137",
      });

      dispatch(
        appStoreActions.setConvert({
          status: ConvertStatus.SENT,
        })
      );
    } catch (error) {
      console.error("convert tokens error", error);
      setCountFailed(countFailed + 1);
      dispatch(
        appStoreActions.setConvert({
          status: ConvertStatus.ERROR,
        })
      );
    }
  };

  return (
    <Box mt="auto" mb="16px">
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
            status === ConvertStatus.SENDING ||
            status === ConvertStatus.LOADING ||
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
            const message = `You are going to convert ${input.amountIn} ${selectedTokenIn?.symbol}. This action can not be undone. Are you sure?`;
            if (window.Telegram?.WebApp?.showConfirm) {
              window.Telegram?.WebApp?.showConfirm(
                message,
                (confirmed: boolean) => {
                  if (confirmed) {
                    convertTokens();
                  }
                }
              );
            } else {
              const confirmed = window.confirm(message);
              if (confirmed) {
                convertTokens();
              }
            }
          }}
        >
          {countFailed > 3
            ? "Try later..."
            : status === ConvertStatus.SENDING
            ? "Converting..."
            : "Convert"}
        </Button>
      </Stack>
    </Box>
  );
};

export default ConvertTokensInputButtons;
