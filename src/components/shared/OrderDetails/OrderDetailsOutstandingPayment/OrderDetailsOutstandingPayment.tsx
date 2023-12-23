import React from "react";
import { Stack, Typography } from "@mui/material";
import { selectAppStore, useAppSelector } from "store";

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
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="16" height="16" rx="8" fill="#FFB930" />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M7.79711 7.56665H12.0001C12.2394 7.56665 12.4334 7.76066 12.4334 7.99998C12.4334 8.23931 12.2394 8.43332 12.0001 8.43332H8.20304L4.99964 12.2774C4.84643 12.4613 4.57318 12.4861 4.38933 12.3329C4.20548 12.1797 4.18064 11.9064 4.33385 11.7226L7.79711 7.56665Z"
            fill="white"
          />
        </svg>
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
