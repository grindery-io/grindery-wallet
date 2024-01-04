import React from "react";
import { Box, Button, Typography } from "@mui/material";
import Title from "../Title";
import { appStoreActions, useAppDispatch } from "../../../store";
import { TGEStatus } from "../../../types/State";

const OrderTokensError = () => {
  const dispatch = useAppDispatch();
  return (
    <Box
      sx={{
        margin: "50px 20px",
        textAlign: "center",
      }}
    >
      <Title>Server error. Please, try again later.</Title>
      <Typography color="hint" variant="sm" sx={{ marginBottom: "20px" }}>
        Wait for at least 30 seconds before making a new attempt.
      </Typography>
      <Button
        onClick={() => {
          dispatch(appStoreActions.setTGE({ status: TGEStatus.WAITING }));
        }}
      >
        Try again
      </Button>
    </Box>
  );
};

export default OrderTokensError;
