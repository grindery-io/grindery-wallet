import React from "react";
import { Box, Button, InputBase, Stack } from "@mui/material";
import { selectAppStore, useAppSelector } from "../../../../store";
import { GRINDERY_ONE_TOKEN } from "../../../../constants";
import { Token, TokenSymbol } from "../../Token";

const SendTokensInputAmount = ({
  amount,
  onChange,
  recepient,
}: {
  amount: string;
  onChange: (value: string) => void;
  recepient?: string | string[] | null;
}) => {
  const { tokens } = useAppSelector(selectAppStore);
  const selectedToken = tokens.find(
    (token) =>
      token.address.toLowerCase() === GRINDERY_ONE_TOKEN.address.toLowerCase()
  );
  const balance =
    parseFloat(selectedToken?.balance || "0") /
    10 ** (selectedToken?.decimals || 18);

  return selectedToken ? (
    <Token token={selectedToken}>
      <Stack
        alignItems="center"
        useFlexGap
        direction="row"
        sx={{
          borderRadius: "10px",
          border: "none",
          background: "var(--tg-theme-secondary-bg-color, #efeff3)",
          width: "100%",
          padding: "10px 10px 10px 20px",
        }}
        spacing="16px"
      >
        <Box>
          <p
            style={{
              fontSize: "14px",
              margin: 0,
              lineHeight: 1.5,
              color: "var(--tg-theme-text-color, #000000)",
            }}
          >
            Amount
          </p>
          <InputBase
            autoFocus
            name="amount"
            value={amount}
            onChange={(e) => {
              onChange(
                typeof balance !== "undefined"
                  ? Array.isArray(recepient)
                    ? parseFloat(e.target.value) >
                      Math.round((balance / recepient.length) * 100) / 100
                      ? (
                          Math.round((balance / recepient.length) * 100) / 100
                        ).toString()
                      : e.target.value
                    : parseFloat(e.target.value) > balance
                    ? balance.toString()
                    : e.target.value
                  : "0"
              );
            }}
            sx={{}}
            placeholder="0"
            type="number"
            inputProps={{
              min: 1,
              sx: {
                color: "var(--tg-theme-text-color, #000000)",
              },
              step: 1,
            }}
          />
          {Array.isArray(recepient) && (
            <>
              <p
                style={{
                  color: "var(--tg-theme-hint-color, #999999)",
                  margin: "6px 0 0",
                  padding: 0,
                  fontSize: "14px",
                }}
              >
                <span
                  style={{
                    color: "var(--tg-theme-text-color, #000000)",
                    fontWeight: "bold",
                  }}
                >
                  {amount ? parseFloat(amount) * recepient.length : 0}{" "}
                  <TokenSymbol />
                </span>{" "}
                total for {recepient.length} contacts
              </p>
            </>
          )}
        </Box>
        {balance && (
          <Button
            variant="outlined"
            size="small"
            sx={{
              padding: "2px 4px",
              marginLeft: "auto",
            }}
            onClick={() => {
              const value = Array.isArray(recepient)
                ? Math.floor(balance / recepient.length).toString()
                : balance.toString();
              onChange(value);
            }}
          >
            Max
          </Button>
        )}
      </Stack>
    </Token>
  ) : null;
};

export default SendTokensInputAmount;
