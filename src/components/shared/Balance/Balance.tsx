import React from "react";
import { Box } from "@mui/material";
import { selectAppStore, useAppSelector } from "../../../store";
import BalanceValue from "./BalanceValue";
import BalanceUpdated from "./BalanceUpdated";

const Balance = () => {
  const {
    balance: { cached, updated },
  } = useAppSelector(selectAppStore);

  return (
    <Box
      sx={{
        ...BalanceStyles,
        opacity: cached ? 0.6 : 1,
      }}
    >
      <BalanceValue />
      {updated && <BalanceUpdated />}
    </Box>
  );
};

const BalanceStyles = {
  width: "100%",
  padding: "16px 16px 12px",
  textAlign: "center",
  margin: "30px 0 26px",
};

export default Balance;
