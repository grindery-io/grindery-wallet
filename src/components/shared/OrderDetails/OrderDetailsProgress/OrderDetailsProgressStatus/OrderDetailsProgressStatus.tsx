import { Typography } from "@mui/material";
import React from "react";

type Props = {};

const OrderDetailsProgressStatus = (props: Props) => {
  return (
    <>
      <Typography variant="lg" textAlign="center">
        <strong>Progress Steps</strong>
      </Typography>
      <Typography variant="lg" textAlign="center">
        <strong>Pay Now</strong>
      </Typography>
    </>
  );
};

export default OrderDetailsProgressStatus;
