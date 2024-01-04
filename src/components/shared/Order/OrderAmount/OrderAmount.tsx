import React from "react";
import { SxProps, Box } from "@mui/material";
import { useOrder } from "../Order";
import { OrderType } from "types";
export type OrderAmountFormat = "gx" | "g1" | "usd";

export type OrderAmountProps = {
  format?: OrderAmountFormat;
  sx?: SxProps | React.CSSProperties;
};

const formatOrderAmount = (order: OrderType, format: OrderAmountFormat) => {
  switch (format) {
    case "gx":
      return order.gxReceived;
    case "g1":
      return order.tokenAmountG1;
    case "usd":
      return parseFloat(order?.usdFromUsdInvestment || "0").toFixed(2);
    default:
      return null;
  }
};

const OrderAmount = ({ format, sx }: OrderAmountProps) => {
  const order = useOrder();

  const amount = order ? formatOrderAmount(order, format || "gx") : null;
  return amount ? (
    <Box sx={sx} component="span">
      {amount}
    </Box>
  ) : null;
};

export default OrderAmount;
