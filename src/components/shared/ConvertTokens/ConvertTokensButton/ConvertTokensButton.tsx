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

  const handleClick = () => {
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

  return (
    <Box sx={{ margin: "auto 16px 16px" }}>
      <Button
        disabled={disabled}
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleClick}
      >
        Pre-order
      </Button>
    </Box>
  );
};

export default ConvertTokensButton;
