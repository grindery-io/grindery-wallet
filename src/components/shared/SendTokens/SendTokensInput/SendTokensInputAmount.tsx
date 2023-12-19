import React from "react";
import { Box, Button, InputBase, Stack } from "@mui/material";
import { selectAppStore, useAppSelector } from "store";
import { Token, TokenSymbol } from "components/shared/Token";

const SendTokensInputAmount = ({
  onChange,
  sendRef,
}: {
  onChange: (value: string) => void;
  sendRef?: React.RefObject<HTMLButtonElement>;
}) => {
  const {
    tokens,
    send: { input },
  } = useAppSelector(selectAppStore);
  const { amount, recipient, chainId, tokenAddress } = input;

  const selectedToken = tokens.find(
    (token) =>
      token.address.toLowerCase() === tokenAddress?.toLowerCase() &&
      token.chain === chainId
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
                  ? Array.isArray(recipient)
                    ? parseFloat(e.target.value) >
                      Math.round((balance / recipient.length) * 100) / 100
                      ? (
                          Math.round((balance / recipient.length) * 100) / 100
                        ).toString()
                      : e.target.value
                    : parseFloat(e.target.value) > balance
                    ? balance.toString()
                    : e.target.value
                  : "0"
              );
            }}
            onKeyUp={(e) => {
              if (e.key === "Enter" && sendRef?.current) {
                sendRef.current.focus();
                setTimeout(() => {
                  if (sendRef.current) {
                    sendRef.current.click();
                  }
                }, 100);
              }
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
              enterKeyHint: "send",
            }}
          />
          {Array.isArray(recipient) && (
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
                  {amount ? parseFloat(amount) * recipient.length : 0}{" "}
                  <TokenSymbol />
                </span>{" "}
                total for {recipient.length} contacts
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
              const value = Array.isArray(recipient)
                ? Math.floor(balance / recipient.length).toString()
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
