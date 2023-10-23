import React, { useCallback, useReducer } from "react";
import { TelegramAuthUserInput } from "../../../types/Telegram";
import ConnectTelegramSuccess from "./ConnectTelegramSuccess";
import { Stack } from "@mui/material";
import ConnectTelegramDescription from "./ConnectTelegramDescription";
import ConnectTelegramForm from "./ConnectTelegramForm";
import { callbackAuthRequest, initAuthRequest } from "../../../services/auth";

export type ConnectTelegramStateProps = {
  loading: boolean;
  input: TelegramAuthUserInput;
  error: string;
  operationId: string;
  telegramSessionSaved?: boolean;
};

const defaultState = {
  loading: false,
  input: {
    phone: "",
    password: "",
    code: "",
  },
  error: "",
  operationId: "",
  telegramSessionSaved: false,
};

const ConnectTelegram = () => {
  const [state, setState] = useReducer(
    (
      state: ConnectTelegramStateProps,
      newState: Partial<ConnectTelegramStateProps>
    ) => ({
      ...state,
      ...newState,
    }),
    {
      ...defaultState,
    }
  );
  const { telegramSessionSaved } = state;

  const handleInputChange = useCallback(
    (name: string, value: string) => {
      setState({
        error: "",
        input: {
          ...state.input,
          [name]: value,
        },
      });
    },
    [state.input]
  );

  const submitPhoneAndPassword = useCallback(async () => {
    if (!state.input.phone) {
      setState({
        error: "Phone number is required",
      });
      return;
    }
    if (!state.input.password) {
      setState({
        error: "Password is required",
      });
      return;
    }
    setState({
      error: "",
      loading: true,
    });
    try {
      const res = await initAuthRequest(
        state.input.phone,
        state.input.password
      );
      setState({
        operationId: res.data?.operationId || "",
      });
    } catch (error: any) {
      setState({
        operationId: "",
        error: error?.response?.data?.error?.message || "Something went wrong",
      });
    }
    setState({
      loading: false,
    });
  }, [state]);

  const submitPhoneCode = useCallback(async () => {
    if (!state.input.code) {
      setState({
        error: "Phone code is required",
      });
      return;
    }
    setState({
      error: "",
      loading: true,
    });
    try {
      await callbackAuthRequest(state.operationId, state.input.code);
      setState({
        telegramSessionSaved: true,
      });
    } catch (error: any) {
      setState({
        operationId: "",
        error: error?.response?.data?.error?.message || "Something went wrong",
      });
    }
    setState({
      loading: false,
    });
  }, [state]);

  return (
    <Stack
      alignItems="stretch"
      justifyContent="center"
      sx={{
        flexDirection: {
          xs: "column",
          sm: "column",
          md: "row",
          lg: "row",
          xl: "row",
        },
        flexWrap: {
          xs: "wrap",
          sm: "wrap",
          md: "nowrap",
          lg: "nowrap",
          xl: "nowrap",
        },
        minHeight: "100vh",
      }}
    >
      <Stack
        direction="column"
        alignItems="center"
        justifyContent="center"
        flexWrap="nowrap"
        sx={{
          display: {
            xs: telegramSessionSaved ? "none" : "flex",
            sm: telegramSessionSaved ? "none" : "flex",
            md: "flex",
            lg: "flex",
            xl: "flex",
          },

          backgroundColor: "#E5F4FC",
          flex: 1,
          padding: {
            xs: "40px 24px",
            sm: "40px 24px",
            md: "40px",
            lg: "40px",
            xl: "40px",
          },
        }}
      >
        <ConnectTelegramDescription />
      </Stack>
      <Stack
        direction="column"
        alignItems="center"
        justifyContent="center"
        flexWrap="nowrap"
        sx={{
          backgroundColor: "#fff",
          flex: 1,
          padding: {
            xs: "40px 24px",
            sm: "40px 24px",
            md: "40px",
            lg: "40px",
            xl: "40px",
          },
        }}
      >
        {telegramSessionSaved ? (
          <ConnectTelegramSuccess />
        ) : (
          <ConnectTelegramForm
            state={state}
            handleInputChange={handleInputChange}
            submitPhoneAndPassword={submitPhoneAndPassword}
            submitPhoneCode={submitPhoneCode}
          />
        )}
      </Stack>
    </Stack>
  );
};

export default ConnectTelegram;
