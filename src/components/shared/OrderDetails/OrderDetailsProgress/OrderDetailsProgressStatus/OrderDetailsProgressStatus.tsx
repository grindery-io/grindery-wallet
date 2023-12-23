import React from "react";
import { Typography } from "@mui/material";
import OrderDetailsPayment from "../../OrderDetailsPayment/OrderDetailsPayment";

const OrderDetailsProgressStatus = () => {
  return (
    <>
      <Typography variant="xs" textAlign="center" color="hint">
        Progress Steps Comin Soon
      </Typography>
      <OrderDetailsPayment />
    </>
  );
};

export default OrderDetailsProgressStatus;
