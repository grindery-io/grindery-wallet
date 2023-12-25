import React from "react";
import { Box, Step, StepIconProps, StepLabel, Stepper } from "@mui/material";
import { selectAppStore, useAppSelector } from "store";
import { OrderStatus } from "types";
import AnimatedTimeIcon from "components/icons/AnimatedTimeIcon";

const OrderDetailsPaymentProgress = () => {
  const {
    order: { status },
  } = useAppSelector(selectAppStore);
  const activeStepIndex =
    status === OrderStatus.SENT
      ? 1
      : status === OrderStatus.PAYING
      ? 2
      : status === OrderStatus.COMPLETED
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
