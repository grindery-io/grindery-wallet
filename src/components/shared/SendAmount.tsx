import React from "react";
import styled from "styled-components";
import { Button, InputBase } from "@mui/material";
import useAppContext from "../../hooks/useAppContext";

const Wrapper = styled.div`
  border-radius: 10px;
  border: none;
  background: var(--tg-theme-bg-color, #ffffff);
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
}: {
  amount: string;
  onChange: (value: string) => void;
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
                ? parseFloat(e.target.value) > balance
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
      </div>
      {balance && (
        <Button
          color="secondary"
          variant="outlined"
          size="small"
          sx={{
            background: "var(--tg-theme-bg-color, #ffffff)",
            color: "var(--tg-theme-button-color, #2481cc)",
            border: "1px solid var(--tg-theme-button-color, #2481cc)",
            margin: 0,
            padding: "2px 4px",
            width: "auto",
            marginLeft: "auto",
            fontSize: "12px",
            "&:hover": {
              background: "var(--tg-theme-bg-color, #ffffff)",
              color: "var(--tg-theme-button-color, #2481cc)",
              border: "1px solid var(--tg-theme-button-color, #2481cc)",
              opacity: 1,
            },
          }}
          onClick={() => {
            onChange(balance.toString());
          }}
        >
          Max
        </Button>
      )}
    </Wrapper>
  );
};

export default SendAmount;
