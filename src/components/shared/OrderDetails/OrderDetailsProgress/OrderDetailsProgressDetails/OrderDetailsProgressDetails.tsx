import React from "react";
import { Box, Stack } from "@mui/material";
import OrderDetailsNonRefundableDeposit from "../../OrderDetailsNonRefundableDeposit/OrderDetailsNonRefundableDeposit";
import OrderDetailsOutstandingPayment from "../../OrderDetailsOutstandingPayment/OrderDetailsOutstandingPayment";
import OrderDetailsGxAmount from "../../OrderDetailsGxAmount/OrderDetailsGxAmount";
import GXIcon from "components/icons/GXIcon";

const OrderDetailsProgressDetails = () => {
  return (
    <Box
      sx={{
        margin: "0 16px",
        width: "calc(100% - 32px)",
        border: "1px solid var(--gr-theme-divider-color)",
        borderRadius: "8px",
      }}
    >
      <OrderDetailsGxAmount
        icon={<GXIcon sx={{ width: "48px", height: "48px" }} />}
      />
      <Stack
        sx={{ padding: "16px" }}
        spacing="8px"
        alignItems="stretch"
        justifyContent="flex-start"
        direction="column"
      >
        <OrderDetailsNonRefundableDeposit />
        <OrderDetailsOutstandingPayment />
      </Stack>
    </Box>
  );
};

export default OrderDetailsProgressDetails;
