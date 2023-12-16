import { Box, Button } from "@mui/material";
import React from "react";
import {
  appStoreActions,
  selectAppStore,
  useAppDispatch,
  useAppSelector,
} from "store";
import { ConvertStatus } from "types";

type ConvertTokensButtonProps = {};

const ConvertTokensButton = (props: ConvertTokensButtonProps) => {
  const dispatch = useAppDispatch();
  const {
    convert: { input, status, result },
  } = useAppSelector(selectAppStore);
  const disabled =
    status === ConvertStatus.LOADING ||
    parseFloat(input.convert || "0") <= 0 ||
    parseFloat(result || "0") <= 0;

  const convertTokens = () => {
    dispatch(
      appStoreActions.setConvert({
        status: ConvertStatus.SENDING,
      })
    );
    // TODO: place real order on server
    setTimeout(() => {
      dispatch(
        appStoreActions.setConvert({
          status: ConvertStatus.SENT,
        })
      );
    }, 1500);
  };

  const handleClick = () => {
    const message = `Confirm your pre-order.\n\nYou are reserving ${result} GX of a value of USD 122 with a non-refundable exchange of ${
      input.convert
    } G1${
      parseFloat(input.add) > 0
        ? ` now and a payment of ${input.add} USD in any supported token before 21.12.2023`
        : ""
    }.`;

    if (window.Telegram?.WebApp?.showConfirm) {
      window.Telegram?.WebApp?.showConfirm(message, (confirmed: boolean) => {
        if (confirmed) {
          convertTokens();
        }
      });
    } else {
      const confirmed = window.confirm(message);
      if (confirmed) {
        convertTokens();
      }
    }
  };

  return (
    <Box sx={{ margin: "auto 16px 16px" }}>
      <Button
        disabled={disabled}
        variant="contained"
        fullWidth
        onClick={handleClick}
        color="secondary"
      >
        Pre-order
      </Button>
    </Box>
  );
};

export default ConvertTokensButton;
