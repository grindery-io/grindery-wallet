import React from "react";
import { SxProps, Box } from "@mui/material";
import { useOrder } from "../Order";
import { OrderType } from "types";
export type OrderPriceFormat = "total" | "gx";

export type OrderPriceProps = {
  format?: OrderPriceFormat;
  sx?: SxProps | React.CSSProperties;
};

const formatOrderPrice = (order: OrderType, format: OrderPriceFormat) => {
  switch (format) {
    case "gx":
      return (1 / parseFloat(order?.GxUsdExchangeRate || "0")).toFixed(4);
    case "total":
      return String(order?.equivalentUsdInvested || 0);
    default:
      return null;
  }
};

const OrderPrice = ({ format, sx }: OrderPriceProps) => {
  const order = useOrder();

  const price = order ? formatOrderPrice(order, format || "gx") : null;
  return price ? (
    <Box sx={sx} component="span">
      {price}
    </Box>
  ) : null;
};

export default OrderPrice;
