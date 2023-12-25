import React from "react";
import { Stack, Typography } from "@mui/material";
import { selectAppStore, useAppSelector } from "store";
import AnimatedTimeIcon from "components/icons/AnimatedTimeIcon";

const OrderDetailsOutstandingPayment = () => {
  const {
    order: {
      input: { add },
    },
  } = useAppSelector(selectAppStore);

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      spacing="8px"
      flexWrap="nowrap"
      sx={{
        width: "100%",
        maxWidth: "100%",
        overflow: "hidden",
        padding: "2px 5px",
        background: "#FFF1D6",
        borderRadius: "22px",
        "& p": {
          color: "#000",
          maxWidth: "100%",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        },
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-start"
        flexWrap="nowrap"
        spacing="5px"
        sx={{
          width: "100%",
          overflow: "hidden",
          "& p": {
            color: "#000",
            width: "100%",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          },
        }}
      >
        <AnimatedTimeIcon
          sx={{ width: "16px", height: "16px", minWidth: "16px" }}
        />
        <Typography variant="sm">*Outstanding payment:</Typography>
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        spacing="4px"
        flexWrap="nowrap"
        sx={{
          width: "60%",
          overflow: "hidden",
          "& p": {
            textAlign: "right",
            color: "#000",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          },
        }}
      >
        <Typography style={{ width: "100%" }}>
          <strong>${parseFloat(add).toFixed(2)}</strong>
        </Typography>
        <Typography
          style={{ minWidth: "35px", width: "35px", maxWidth: "35px" }}
        >
          <strong>USD</strong>
        </Typography>
      </Stack>
    </Stack>
  );
};

export default OrderDetailsOutstandingPayment;
