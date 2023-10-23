import React, { useRef } from "react";
import AlertBox from "../AlertBox";
import { Box, Button, Stack } from "@mui/material";
import ConnectTelegramCommitment from "./ConnectTelegramCommitment";
import { ConnectTelegramStateProps } from "./ConnectTelegram";

const ConnectTelegramForm = ({
  state,
  handleInputChange,
  submitPhoneAndPassword,
  submitPhoneCode,
}: {
  state: ConnectTelegramStateProps;
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
      <Box sx={InputGroupStyles}>
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
      </Box>

      <Box sx={InputGroupStyles}>
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
      </Box>

      <Box
        sx={{
          ...InputGroupStyles,
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
      </Box>

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

const InputGroupStyles = {
  display: "flex",
  alignItems: "stretch",
  justifyContent: "flex-start",
  flexWrap: "nowrap",
  flexDirection: "column",
  gap: "4px",
  transition: "all 0.2s ease-in-out",
  overflow: "hidden",
  padding: 0,
  margin: 0,
  boxSizing: "border-box",

  "& label": {
    fontSize: "14px",
    lineHeight: "150%",
    textAlign: "center",
    fontFamily: "Geologica",
    color: "var(--tg-theme-text-color, #000000)",
    fontWeight: "bold",
  },

  "& input": {
    width: "100%",
    background: "#f4f5f7",
    borderRadius: "6px",
    padding: "7px 15px",
    border: "1px solid #dcdcdc",
    boxSizing: "border-box",
    minHeight: "44px",
    fontFamily: "Geologica",
    fontWeight: "400",
    fontSize: "16px",
    lineHeight: "150%",
    color: "#0b0d17",
    textAlign: "center",

    "&:disabled": {
      opacity: 0.5,
      cursor: "not-allowed",
    },
  },

  "& p": {
    fontWeight: "400",
    fontSize: "14px",
    lineHeight: "150%",
    color: "#0b0d17",
    textAlign: "center",

    "&.error": {
      color: "#ff5858",
    },
  },
};

export default ConnectTelegramForm;
