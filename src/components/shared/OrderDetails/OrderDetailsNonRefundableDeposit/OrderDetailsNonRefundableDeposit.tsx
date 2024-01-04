import React from "react";
import { Token, TokenIcon, TokenType } from "components/shared/Token";
import { GRINDERY_ONE_TOKEN } from "../../../../constants";
import { Stack, Typography } from "@mui/material";
import OrderAmount from "components/shared/Order/OrderAmount/OrderAmount";

const LABEL = "Non-refundable deposit";

const OrderDetailsNonRefundableDeposit = () => {
  const grinderyToken = GRINDERY_ONE_TOKEN as TokenType;

  return (
    <Token token={grinderyToken}>
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
            <strong>
              <OrderAmount format="g1" />
            </strong>
          </Typography>
          <TokenIcon size={14} />
          <Typography
            style={{ width: "29px", minWidth: "20px", maxWidth: "29px" }}
          >
            <strong>G1</strong>
          </Typography>
        </Stack>
      </Stack>
    </Token>
  );
};

export default OrderDetailsNonRefundableDeposit;
