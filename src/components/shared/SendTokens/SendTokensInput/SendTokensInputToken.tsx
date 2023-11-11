import React from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { GRINDERY_ONE_TOKEN } from "../../../../constants";
import { Box, Stack, Typography } from "@mui/material";
import { selectAppStore, useAppSelector } from "../../../../store";
import { Token, TokenBalance, TokenIcon, TokenSymbol } from "../../Token";

const SendTokensInputToken = () => {
  const { tokens } = useAppSelector(selectAppStore);
  const selectedToken = tokens.find(
    (token) =>
      token.address.toLowerCase() === GRINDERY_ONE_TOKEN.address.toLowerCase()
  );
  return selectedToken ? (
    <Token token={selectedToken}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-start"
        spacing="16px"
        sx={{
          padding: "10px 10px 10px 20px",
          width: "100%",
          borderRadius: "10px",

          backgroundColor: "var(--tg-theme-secondary-bg-color, #efeff3)",
        }}
      >
        <TokenIcon size={36} />
        <Box>
          <Typography variant="sm" sx={{ lineHeight: 1.5 }}>
            <TokenSymbol />{" "}
            <span style={{ color: "var(--tg-theme-hint-color, #999999)" }}>
              on Polygon blockchain
            </span>
          </Typography>
          <Typography variant="xs" sx={{ lineHeight: 1.5 }} color="hint">
            Balance: <TokenBalance format="eth" />
          </Typography>
        </Box>
        <ArrowDropDownIcon
          sx={{
            padding: "8px",
            marginLeft: "auto",
            color: "var(--tg-theme-hint-color, #999999)",
            opacity: 0.2,
          }}
        />
      </Stack>
    </Token>
  ) : null;
};

export default SendTokensInputToken;
