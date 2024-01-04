import React from "react";
import { Token, TokenIcon, TokenType } from "components/shared/Token";
import { GRINDERY_ONE_TOKEN, MAIN_TOKEN_ADDRESS } from "../../../../constants";
import { selectAppStore, useAppSelector } from "store";
import { Stack, Typography } from "@mui/material";

const LABEL = "Non-refundable deposit";

const OrderDetailsNonRefundableDeposit = () => {
  const {
    tokens,
    order: { details },
  } = useAppSelector(selectAppStore);
  const grinderyToken =
    tokens.find(
      (token) =>
        token.address.toLowerCase() === MAIN_TOKEN_ADDRESS.toLowerCase()
    ) || (GRINDERY_ONE_TOKEN as TokenType);

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
            <strong>{details?.tokenAmountG1}</strong>
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
