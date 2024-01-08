import React, { useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import OrderDetailsNonRefundableDeposit from "../OrderDetailsNonRefundableDeposit/OrderDetailsNonRefundableDeposit";
import OrderDetailsGxAmount from "../OrderDetailsGxAmount/OrderDetailsGxAmount";
import CheckIcon from "components/icons/CheckIcon";
import OrderDetailsUsdAmount from "../OrderDetailsUsdAmount/OrderDetailsUsdAmount";
import { deleteOrder } from "services";

const OrderDetailsCompleted = () => {
  const [isEnded, setIsEnded] = useState(false);

  const gxAmountTitle = isEnded ? "Order Completed" : "You Hold";

  return (
    <>
      <Box
        sx={{
          margin: "16px 16px",
          width: "calc(100% - 32px)",
          border: "1px solid var(--gr-theme-divider-color)",
          borderRadius: "8px",
        }}
      >
        <OrderDetailsGxAmount
          title={gxAmountTitle}
          showGxIcon
          icon={
            isEnded ? (
              <CheckIcon
                sx={{ color: "#00B674", width: "42px", height: "42px" }}
              />
            ) : undefined
          }
        />
        <Stack
          sx={{ padding: "16px" }}
          spacing="8px"
          alignItems="stretch"
          justifyContent="flex-start"
          direction="column"
        >
          <OrderDetailsNonRefundableDeposit />
          <OrderDetailsUsdAmount />
        </Stack>
      </Box>
      <Typography variant="title" textAlign="center" sx={{ margin: "0 16px" }}>
        <strong>Next Steps</strong>
      </Typography>
      <Typography
        textAlign="center"
        color="hint"
        variant="sm"
        sx={{ margin: "0 16px" }}
      >
        &lt;text and instructions about how tokens are received&gt;
      </Typography>
      <Box sx={{ margin: "auto 16px 16px" }}>
        {!isEnded && (
          <Button
            color="success"
            variant="outlined"
            size="small"
            fullWidth
            onClick={() => {
              setIsEnded(true);
            }}
            sx={{ marginBottom: "12px" }}
          >
            Simulate end of TGE (testing)
          </Button>
        )}

        <Button
          color="error"
          variant="outlined"
          size="small"
          fullWidth
          onClick={() => {
            deleteOrder()
              .then(() => {
                window.location.reload();
              })
              .catch(() => {
                //
              });
          }}
        >
          Delete order and restart (testing)
        </Button>
      </Box>
    </>
  );
};

export default OrderDetailsCompleted;
