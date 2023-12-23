import React from "react";
import { Stack, Typography } from "@mui/material";
import { selectAppStore, useAppSelector } from "store";

const LABEL = "Booster payment";

const OrderDetailsUsdAmount = () => {
  const {
    order: {
      input: { add },
    },
  } = useAppSelector(selectAppStore);
  const hasBooster = Boolean(add && parseFloat(add) > 0);
  const usdAmount = `$${parseFloat(add).toFixed(2)}`;

  return hasBooster ? (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      spacing="8px"
      flexWrap="nowrap"
      sx={{
        "& p": {
          width: "100%",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        },
      }}
    >
      <Typography variant="sm" color="hint" sx={{ width: "100%" }}>
        {LABEL}:
      </Typography>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        spacing="4px"
        flexWrap="nowrap"
        sx={{
          width: "50%",
          textAlign: "right",
          "& p": {
            textAlign: "right",
            maxWidth: "100%",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          },
        }}
      >
        <Typography>
          <strong>{usdAmount}</strong>
        </Typography>
        <Typography
          style={{ width: "35px", minWidth: "35px", maxWidth: "35px" }}
        >
          <strong>USD</strong>
        </Typography>
      </Stack>
    </Stack>
  ) : null;
};

export default OrderDetailsUsdAmount;
