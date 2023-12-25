import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import ArrowDownIcon from "components/icons/ArrowDownIcon";
import GXIcon from "components/icons/GXIcon";
import { selectAppStore, useAppSelector } from "store";
import { OrderStatus } from "types";

const OrderTokensOutput = () => {
  const {
    order: { quote, status, input },
  } = useAppSelector(selectAppStore);

  const gxAmount = parseFloat(quote?.gx_received || "0");
  const discount = quote?.discount_received || "0.00";
  const gxPrice = (
    1 / parseFloat(quote?.equivalent_gx_usd_exchange_rate || "0")
  ).toFixed(4);
  const gxPriceTotal = String(quote?.equivalent_usd_invested || 0);

  return (
    <Stack
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ margin: "16px", flex: 1 }}
    >
      {Boolean(input.convert) ? (
        <>
          <ArrowDownIcon sx={{ marginBottom: "4px !important" }} />
          {status === OrderStatus.LOADING ? (
            <Typography color="hint" mt="8px" textAlign="center">
              <strong>Calculating...</strong>
            </Typography>
          ) : (
            <>
              <Typography color="hint" mb="8px" variant="sm" textAlign="center">
                <strong>You get</strong>
              </Typography>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
                spacing="8px"
                sx={{ maxWidth: "100%" }}
              >
                {discount && gxAmount > 0 && (
                  <Box
                    sx={{
                      maxWidth: "77px",
                      minWidth: "77px",
                      width: "77px",
                      height: "21px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      padding: "4px 10px 4px 4px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "10px",
                      fontWeight: "700",
                      lineHeight: "125%",
                      color: "#ffffff",
                      position: "relative",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="77"
                      height="21"
                      viewBox="0 0 77 21"
                      fill="none"
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        zIndex: 1,
                      }}
                    >
                      <path
                        d="M0.5 0H64.9914L76.5 10.5L64.9914 21H0.5V0Z"
                        fill="#EA5230"
                      />
                    </svg>
                    <span style={{ position: "relative", zIndex: 2 }}>
                      {discount}% OFF
                    </span>
                  </Box>
                )}
                <Typography
                  variant="title"
                  sx={{
                    maxWidth: "100%",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  <strong>{gxAmount}</strong>
                </Typography>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="center"
                  spacing="4px"
                >
                  <GXIcon />
                  <Typography>
                    <strong>GX</strong>
                  </Typography>
                </Stack>
              </Stack>
              {gxAmount > 0 && (
                <Typography
                  variant="xs"
                  color="hint"
                  mt="6px"
                  textAlign="center"
                >
                  Value ${gxPriceTotal} USD or {gxPrice} USD/GX
                </Typography>
              )}
            </>
          )}
        </>
      ) : (
        <Typography
          color="hint"
          mt="8px"
          sx={{ paddingLeft: "16px", paddingRight: "16px" }}
          textAlign="center"
        >
          <strong>Enter an amount of G1 tokens to exchange</strong>
        </Typography>
      )}
    </Stack>
  );
};

export default OrderTokensOutput;
