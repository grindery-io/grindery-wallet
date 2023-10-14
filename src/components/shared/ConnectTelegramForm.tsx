import React, { useRef } from "react";
import styled from "styled-components";
import AlertBox from "./AlertBox";
import { Button, Stack } from "@mui/material";
import { ConnectTelegramPageStateProps } from "../pages/ConnectTelegramPage";
import ConnectTelegramCommitment from "./ConnectTelegramCommitment";

const InputGroup = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: flex-start;
  flex-wrap: nowrap;
  flex-direction: column;
  gap: 4px;
  transition: all 0.2s ease-in-out;
  overflow: hidden;
  padding: 0;
  margin: 0;
  box-sizing: border-box;

  & label {
    font-size: 14px;
    line-height: 150%;
    text-align: center;
    font-family: "Geologica";
    color: var(--tg-theme-text-color, #000000);
    font-weight: bold;
  }

  & input {
    width: 100%;
    background: #f4f5f7;
    border-radius: 6px;
    padding: 7px 15px;
    border: 1px solid #dcdcdc;
    box-sizing: border-box;
    min-height: 44px;
    font-family: Geologica;
    font-weight: 400;
    font-size: 16px;
    line-height: 150%;
    color: #0b0d17;
    text-align: center;

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  & p {
    font-weight: 400;
    font-size: 14px;
    line-height: 150%;
    color: #0b0d17;
    text-align: center;

    &.error {
      color: #ff5858;
    }
  }
`;

const ConnectTelegramForm = ({
  state,
  handleInputChange,
  submitPhoneAndPassword,
  submitPhoneCode,
}: {
  state: ConnectTelegramPageStateProps;
  handleInputChange: (name: string, value: string) => void;
  submitPhoneAndPassword: () => void;
  submitPhoneCode: () => void;
}) => {
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const codeInputRef = useRef<HTMLInputElement>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const {
    input: { phone, password, code },
    loading,
    operationId,
    error,
  } = state;

  return (
    <Stack
      direction="column"
      alignItems="stretch"
      justifyContent="center"
      flexWrap="nowrap"
      spacing="16px"
      useFlexGap
      sx={{ maxWidth: "328px", width: "100%", margin: "0 auto" }}
    >
      <InputGroup>
        <label>Phone number</label>
        <input
          ref={phoneInputRef}
          name="phone"
          autoComplete="tel"
          type="phone"
          value={phone}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            handleInputChange("phone", event.target.value);
          }}
          disabled={loading || Boolean(operationId)}
          placeholder="12345678901"
          style={{
            background: "var(--tg-theme-secondary-bg-color, #efeff3)",
            color: "var(--tg-theme-text-color, #000000)",
            border: "none",
            outline: "none",
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              passwordInputRef.current?.focus();
            }
          }}
        />
        <span
          style={{
            textAlign: "center",
            color: "var(--tg-theme-hint-color, #999999)",
            fontSize: "12px",
          }}
        >
          In the international format
        </span>
      </InputGroup>

      <InputGroup>
        <label>Password</label>

        <input
          ref={passwordInputRef}
          name="password"
          autoComplete="current-password"
          type="password"
          value={password}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            handleInputChange("password", event.target.value);
          }}
          disabled={loading || Boolean(operationId)}
          style={{
            background: "var(--tg-theme-secondary-bg-color, #efeff3)",
            color: "var(--tg-theme-text-color, #000000)",
            border: "none",
            outline: "none",
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              passwordInputRef.current?.blur();
              submitButtonRef.current?.click();
              setTimeout(() => {
                codeInputRef.current?.focus();
              }, 1000);
            }
          }}
        />
      </InputGroup>

      <InputGroup
        style={{
          height: operationId ? "109px" : "0px",
          marginTop: operationId ? "0" : "0px",
        }}
      >
        <label>Code</label>
        <input
          ref={codeInputRef}
          name="code"
          type="number"
          autoComplete="one-time-code"
          value={code}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            handleInputChange("code", event.target.value);
          }}
          disabled={loading}
          style={{
            background: "var(--tg-theme-secondary-bg-color, #efeff3)",
            color: "var(--tg-theme-text-color, #000000)",
            border: "none",
            outline: "none",
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              codeInputRef.current?.blur();
              submitButtonRef.current?.click();
            }
          }}
        />
        <span
          style={{
            textAlign: "center",
            color: "var(--tg-theme-hint-color, #999999)",
            fontSize: "12px",
          }}
        >
          Please check your{" "}
          <a
            href="https://telegram.me/+42777"
            target="_blank"
            rel="noreferrer"
            style={{ color: "var(--tg-theme-link-color, #2481cc)" }}
          >
            Telegram app
          </a>
          .
          <br />
          You should receive an authorization code.
        </span>
      </InputGroup>

      {error && (
        <AlertBox color="error" style={{ marginTop: "0" }}>
          <p
            style={{
              fontSize: "14px",
              color: "inherit",
              marginTop: "2px",
            }}
          >
            {error}
          </p>
        </AlertBox>
      )}

      <Button
        ref={submitButtonRef}
        fullWidth
        disabled={loading}
        onClick={!operationId ? submitPhoneAndPassword : submitPhoneCode}
        sx={{
          color: "#fff",
          backgroundColor: "#0B0D17",
          borderColor: "#0B0D17",
          "&:hover": {
            color: "#fff",
            backgroundColor: "#0B0D17",
            borderColor: "#0B0D17",
          },
          "&:focus": {
            color: "#fff",
            backgroundColor: "#0B0D17",
            borderColor: "#0B0D17",
          },
          "&:disabled": {
            color: "#fff",
            backgroundColor: "#0B0D17",
            borderColor: "#0B0D17",
            opacity: 0.5,
          },
        }}
      >
        {loading ? "Loading" : "Submit"}
      </Button>
      <ConnectTelegramCommitment />
    </Stack>
  );
};

export default ConnectTelegramForm;
