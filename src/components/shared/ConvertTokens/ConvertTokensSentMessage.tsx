import React from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import UserAddress from "../UserAddress";
import { useNavigate } from "react-router";

const ConvertTokensSentMessage = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          "& img": {
            width: "100%",
            height: "auto",
            display: "block",
            maxWidth: "100%",
          },
        }}
      >
        <img src="/images/convert-tokens-success.png" alt="" />
      </Box>
      <Stack
        direction="column"
        alignItems="stretch"
        justifyContent="flex-start"
        spacing="16px"
        useFlexGap
        sx={{
          width: "calc(100% - 48px)",
          margin: "16px 24px",
          "& ul": {
            padding: "0",
            margin: "0",
            "& li": {
              color: "var(--tg-theme-text-color, #000000)",
              listStyleType: "disc",
              fontWeight: "bold",
              fontSize: "14px",
              lineHeight: "1.5",
              padding: 0,
              marginLeft: "16px",
            },
          },
        }}
      >
        <Typography variant="lg">
          <strong>Your pre-order of GX Tokens has been confirmed!</strong>
        </Typography>
        <ul>
          <li>Order ID: 123123</li>
          <li>232123 GX preordered ✅</li>
          <li>1213123123 G1 exchanged ✅</li>
          <li>12 USD pending* ⚠️</li>
        </ul>
        <Typography color="hint" variant="sm">
          * Your wallet will be charged 12 USD on 20.12.2023. Please make sure
          that your wallet holds at least 12 USD or the transaction will not go
          through.
        </Typography>
        <Typography color="hint" variant="sm">
          Please make sure to deposit in your wallet{" "}
          <Box sx={{ "& > div": { textAlign: "left", marginTop: "2px" } }}>
            <UserAddress
              border={false}
              avatar={false}
              sx={{ textAlign: "left" }}
            />
          </Box>
        </Typography>
        <Typography
          color="hint"
          variant="sm"
          sx={{
            "& a": {
              color: "var(--tg-theme-link-color, #2481cc)",
              textDecoration: "underline",
              fontWeight: "bold",
              "&:hover": {
                color: "var(--tg-theme-link-color, #2481cc)",
                textDecoration: "none",
              },
            },
          }}
        >
          More technical details on the token sale{" "}
          <a href="https://www.grindery.io">here</a>.
        </Typography>
        <Button
          sx={{ marginTop: "8px" }}
          fullWidth
          variant="outlined"
          onClick={() => {
            navigate("/tokens");
          }}
        >
          Close
        </Button>
      </Stack>
    </Box>
  );
};

export default ConvertTokensSentMessage;
