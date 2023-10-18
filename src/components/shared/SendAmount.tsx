import React from "react";
import { Box, Button, InputBase, Stack } from "@mui/material";
import { TelegramUserContact } from "../../types/Telegram";
import { selectAppStore, useAppSelector } from "../../store";

const SendAmount = ({
  amount,
  onChange,
  recepient,
}: {
  amount: string;
  onChange: (value: string) => void;
  recepient?: TelegramUserContact | TelegramUserContact[];
}) => {
  const {
    balance: { value: balance },
  } = useAppSelector(selectAppStore);

  return (
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
            min: 0,
            sx: {
              color: "var(--tg-theme-text-color, #000000)",
            },
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
                {amount ? parseFloat(amount) * recepient.length : 0} G1
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
  );
};

export default SendAmount;
