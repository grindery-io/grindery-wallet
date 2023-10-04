import React from "react";
import styled from "styled-components";
import { Button, InputBase } from "@mui/material";
import useAppContext from "../../hooks/useAppContext";

const Wrapper = styled.div`
  border-radius: 10px;
  border: 1px solid var(--grindery-solids-light-grey, #d3deec);
  background: var(--grindery-solids-white, #fff);
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
        <p style={{ fontSize: "14px", margin: 0, lineHeight: 1.5 }}>Amount</p>
        <InputBase
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
          }}
        />
      </div>
      {balance && (
        <Button
          color="secondary"
          variant="outlined"
          size="small"
          sx={{
            margin: 0,
            padding: "2px 4px",
            width: "auto",
            marginLeft: "auto",
            fontSize: "12px",
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
