import React from "react";
import { Box, Button, Typography } from "@mui/material";
import Title from "../Title";
import { appStoreActions, useAppDispatch } from "../../../store";
import { SendStatus } from "../../../types/State";

const SendTokensError = () => {
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
          dispatch(appStoreActions.setSend({ status: SendStatus.WAITING }));
        }}
      >
        Try again
      </Button>
    </Box>
  );
};

export default SendTokensError;
