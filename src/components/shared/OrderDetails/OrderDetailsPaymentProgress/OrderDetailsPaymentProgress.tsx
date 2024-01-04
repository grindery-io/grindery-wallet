import React from "react";
import { Box, Step, StepIconProps, StepLabel, Stepper } from "@mui/material";
import AnimatedTimeIcon from "components/icons/AnimatedTimeIcon";
import { OrderStatus } from "types";
import { useOrder } from "components/shared/Order/Order";

const OrderDetailsPaymentProgress = () => {
  const order = useOrder();
  const activeStepIndex =
    order?.status === OrderStatus.WAITING_USD
      ? 1
      : order?.status === OrderStatus.PENDING_USD
      ? 2
      : order?.status === OrderStatus.COMPLETE
      ? 3
      : 0;

  const steps = [
    activeStepIndex > 0 ? "Ordered" : "Ordering",
    activeStepIndex > 1 ? "Pay" : "Paying",
    activeStepIndex > 2 ? "Processed" : "Processing",
    activeStepIndex > 3 ? "Sent" : "Sent",
  ];

  return (
    <Box sx={{ width: "calc(100% - 32px)", margin: "16px 16px 0" }}>
      <Stepper
        activeStep={activeStepIndex}
        alternativeLabel
        sx={{
          "& .MuiStepConnector-line": {
            borderColor: "var(--tg-theme-hint-color, #999999)",
          },
          "& .MuiStepLabel-label": {
            color: "var(--tg-theme-text-color, #000000)",
            marginTop: "8px",
            fontFamily: "Geologica",
            fontWeight: "400",
          },
          "& .Mui-completed": {
            color: "#00B674",
            "& svg": {
              color: "#00B674 !important",
            },
            "& .MuiStepLabel-label": {
              color: "var(--tg-theme-text-color, #000000)",
            },
          },
          "& .MuiStepLabel-label.Mui-active": {
            color: "var(--tg-theme-text-color, #000000) !important",
          },
          "& .Mui-active": {
            color: "#FFB930",
          },
          "& .Mui-disabled svg": {
            color: "var(--tg-theme-secondary-bg-color, #efeff3)",
          },
          "& .Mui-disabled": {
            "& .MuiStepLabel-label": {
              color: "var(--tg-theme-hint-color, #999999)",
            },
          },
        }}
      >
        {steps.map((label, i) => (
          <Step key={label}>
            <StepLabel
              StepIconComponent={
                activeStepIndex === i
                  ? (stepIconProps: StepIconProps) => <AnimatedTimeIcon />
                  : undefined
              }
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default OrderDetailsPaymentProgress;
