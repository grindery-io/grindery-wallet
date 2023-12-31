import React from "react";
import { Box, Typography } from "@mui/material";
import { OrderStatus } from "types";
import OrderAmount from "components/shared/Order/OrderAmount/OrderAmount";
import { useOrder } from "components/shared/Order/Order";

const OrderDetailsPayLater = () => {
  const order = useOrder();
  return order?.status !== OrderStatus.PENDING_USD ? (
    <Box
      sx={{
        width: "calc(100% - 32px)",
        margin: "0 16px 16px",
        padding: "16px",
        borderRadius: "8px",
        border: "1px dashed var(--tg-theme-hint-color, #999999)",
        backgroundColor: "var(--tg-theme-bg-color, #ffffff)",
      }}
    >
      <Typography variant="lg" textAlign="center" mb="8px">
        <strong>Pay Later</strong>
      </Typography>
      <Typography
        textAlign="center"
        variant="sm"
        color="hint"
        sx={{
          "& a": {
            color: "var(--tg-theme-text-color, #000000)",
            textDecoration: "underline",
            "&:hover": {
              color: "var(--tg-theme-text-color, #000000)",
              textDecoration: "none",
            },
          },
        }}
      >
        You can pay the outstanding balance of *$
        <OrderAmount format="usd" /> USD until the 14.1.2024.{" "}
        <a href="https://grindery.io" target="_blank" rel="noreferrer">
          Learn more
        </a>
        .
      </Typography>
    </Box>
  ) : null;
};

export default OrderDetailsPayLater;
