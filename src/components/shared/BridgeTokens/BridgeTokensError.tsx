import React from "react";
import { Box, Button, Typography } from "@mui/material";
import Title from "../Title";
import { appStoreActions, useAppDispatch } from "../../../store";
import { BridgeStatus } from "../../../types/State";

const BridgeTokensError = () => {
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
          dispatch(appStoreActions.setBridge({ status: BridgeStatus.WAITING }));
        }}
      >
        Try again
      </Button>
    </Box>
  );
};

export default BridgeTokensError;
