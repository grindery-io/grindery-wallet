import React from "react";
import { Box } from "@mui/material";
import { selectAppStore, useAppSelector } from "../../../store";
import BalanceValue from "./BalanceValue/BalanceValue";
import BalanceUpdated from "./BalanceUpdated/BalanceUpdated";
import UserAddress from "../UserAddress";

const Balance = () => {
  const {
    debug: { enabled, features },
    balance,
  } = useAppSelector(selectAppStore);

  return (
    <Box
      data-testid="balance-container"
      sx={{
        width: "100%",
        padding:
          enabled && features?.GX_PREORDER ? "8px 16px 12px" : "16px 16px 12px",
        textAlign: "center",
        margin: "8px 0 0",
        opacity: balance.cached ? 0.6 : 1,
      }}
    >
      <BalanceValue />
      <BalanceUpdated />
      <UserAddress avatar={false} border={false} sx={{ marginTop: "4px" }} />
    </Box>
  );
};

export default Balance;
