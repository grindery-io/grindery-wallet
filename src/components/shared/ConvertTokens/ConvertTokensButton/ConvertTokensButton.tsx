import { Box, Button } from "@mui/material";
import React from "react";
import { appStoreActions, useAppDispatch } from "store";
import { ConvertStatus } from "types";

type ConvertTokensButtonProps = {};

const ConvertTokensButton = (props: ConvertTokensButtonProps) => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(
      appStoreActions.setConvert({
        status: ConvertStatus.SENDING,
      })
    );
    setTimeout(() => {
      dispatch(
        appStoreActions.setConvert({
          status: ConvertStatus.SENT,
        })
      );
    }, 1500);
  };

  return (
    <Box sx={{ margin: "auto 16px 0" }}>
      <Button
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
