import React from "react";
import styled from "styled-components";
import { Button, InputBase } from "@mui/material";
import useAppContext from "../../hooks/useAppContext";
import { TelegramUserContact } from "../../types/Telegram";

const Wrapper = styled.div`
  border-radius: 10px;
  border: none;
  background: var(--tg-theme-secondary-bg-color, #efeff3);
  display: flex;
  width: 100%;
  padding: 10px 10px 10px 20px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 16px;
  box-sizing: border-box;
`;

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
    state: { balance },
  } = useAppContext();
  return (
    <Wrapper>
      <div>
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
      </div>
      {balance && (
        <Button
          color="secondary"
          variant="outlined"
          size="small"
          sx={{
            background: "var(--tg-theme-secondary-bg-color, #efeff3)",
            color: "var(--tg-theme-button-color, #2481cc)",
            border: "1px solid var(--tg-theme-button-color, #2481cc)",
            margin: 0,
            padding: "2px 4px",
            width: "auto",
            marginLeft: "auto",
            fontSize: "12px",
            "&:hover": {
              background: "var(--tg-theme-secondary-bg-color, #efeff3)",
              color: "var(--tg-theme-button-color, #2481cc)",
              border: "1px solid var(--tg-theme-button-color, #2481cc)",
              opacity: 1,
            },
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
    </Wrapper>
  );
};

export default SendAmount;
