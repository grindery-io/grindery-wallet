import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import GXIcon from "components/icons/GXIcon";
import { Token, TokenIcon, TokenType } from "components/shared/Token";
import {
  MAIN_TOKEN_ADDRESS,
  GRINDERY_ONE_TOKEN,
} from "../../../../../constants";
import { selectAppStore, useAppSelector } from "store";

const OrderDetailsProgressDetails = () => {
  const {
    tokens,
    order: {
      quote,
      input: { convert, add },
    },
  } = useAppSelector(selectAppStore);
  const gxTotal = String(quote?.gx_received || 0);
  const gxPrice = 1 / (quote?.equivalent_gx_usd_exchange_rate || 0);
  const gxPriceTotal = String(quote?.equivalent_usd_invested || 0);

  const grinderyToken =
    tokens.find(
      (token) =>
        token.address.toLowerCase() === MAIN_TOKEN_ADDRESS.toLowerCase()
    ) || (GRINDERY_ONE_TOKEN as TokenType);

  return (
    <Box
      sx={{
        margin: "0 16px",
        width: "calc(100% - 32px)",
        border: "1px solid var(--gr-theme-divider-color)",
        borderRadius: "8px",
      }}
    >
      <Stack
        direction="column"
        alignItems="center"
        justifyContent="center"
        spacing="8px"
        sx={{
          padding: "24px 16px",
          borderBottom: "1px solid var(--gr-theme-divider-color)",
        }}
      >
        <GXIcon sx={{ width: "48px", height: "48px" }} />
        <Box
          sx={{
            width: "100%",
          }}
        >
          <Typography
            textAlign="center"
            variant="title"
            mb="4px"
            sx={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            <strong>{gxTotal} GX</strong>
          </Typography>
          <Typography textAlign="center" color="hint" variant="xs" mb="8px">
            Value ${gxPriceTotal} USD or {gxPrice} USD/GX
          </Typography>
        </Box>
      </Stack>
      <Stack
        sx={{ padding: "16px" }}
        spacing="8px"
        alignItems="stretch"
        justifyContent="flex-start"
        direction="column"
      >
        <Token token={grinderyToken}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing="8px"
            flexWrap="nowrap"
            sx={{
              "& p": {
                maxWidth: "100%",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              },
            }}
          >
            <Typography variant="sm" color="hint">
              Non-refundable deposit:
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
                <strong>{convert}</strong>
              </Typography>
              <TokenIcon size={14} />
              <Typography>
                <strong>G1</strong>
              </Typography>
            </Stack>
          </Stack>
        </Token>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing="8px"
          flexWrap="nowrap"
          sx={{
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
              width: "50%",
              "& p": {
                color: "#000",
                maxWidth: "100%",
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
              width: "50%",
              "& p": {
                color: "#000",
                maxWidth: "100%",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              },
            }}
          >
            <Typography>
              <strong>${parseFloat(add).toFixed(2)}</strong>
            </Typography>
            <Typography>
              <strong>USD</strong>
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default OrderDetailsProgressDetails;
