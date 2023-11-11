import React from "react";
import { Box } from "@mui/material";
import { selectAppStore, useAppSelector } from "../../../store";
import BalanceValue from "./BalanceValue";
import BalanceUpdated from "./BalanceUpdated";

const Balance = () => {
  const { balance } = useAppSelector(selectAppStore);

  return (
    <Box
      sx={{
        ...BalanceStyles,
        opacity: balance.cached ? 0.6 : 1,
      }}
    >
      <BalanceValue />
      {balance.updated && <BalanceUpdated />}
    </Box>
  );
};

const BalanceStyles = {
  width: "100%",
  padding: "16px 16px 12px",
  textAlign: "center",
  margin: "8px 0 0",
};

export default Balance;
