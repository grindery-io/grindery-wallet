import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import ArrowDownIcon from "components/icons/ArrowDownIcon";
import GXIcon from "components/icons/GXIcon";
import { selectAppStore, useAppSelector } from "store";
import { ConvertStatus } from "types";

const ConvertTokensOutput = () => {
  const {
    convert: { result, status },
  } = useAppSelector(selectAppStore);

  const discount = "19.34";
  const gxPrice = "0.036";
  const gxPriceTotal = (
    parseFloat(result || "0") * parseFloat(gxPrice)
  ).toFixed(2);

  return (
    <Stack
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ margin: "16px", flex: 1 }}
    >
      <ArrowDownIcon sx={{ marginBottom: "4px !important" }} />
      {status === ConvertStatus.LOADING ? (
        <Typography color="hint" mt="8px">
          <strong>Calculating...</strong>
        </Typography>
      ) : (
        <>
          <Typography color="hint" mb="8px" variant="sm">
            <strong>You get</strong>
          </Typography>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            spacing="8px"
            sx={{ maxWidth: "100%" }}
          >
            {discount && (
              <Box
                sx={{
                  maxWidth: "77px",
                  minWidth: "77px",
                  width: "77px",
                  height: "21px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  padding: "4px 12px 4px 6px",
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
                  style={{ position: "absolute", top: 0, left: 0, zIndex: 1 }}
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
              <strong>{result || "0"}</strong>
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
          <Typography variant="xs" color="hint" mt="6px">
            Value ${gxPriceTotal} USD or {gxPrice} USD/GX
          </Typography>
        </>
      )}
    </Stack>
  );
};

export default ConvertTokensOutput;
