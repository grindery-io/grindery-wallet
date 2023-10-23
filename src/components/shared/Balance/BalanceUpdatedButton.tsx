import React from "react";
import { Box, Typography } from "@mui/material";
import RefreshIcon from "../../icons/RefreshIcon";
import {
  appStoreActions,
  selectAppStore,
  useAppDispatch,
  useAppSelector,
} from "../../../store";

const BalanceUpdatedButton = () => {
  const dispatch = useAppDispatch();
  const {
    balance: { loading },
  } = useAppSelector(selectAppStore);

  return (
    <button
      onClick={() => {
        dispatch(
          appStoreActions.setBalance({
            loading: true,
            shouldUpdate: true,
          })
        );
      }}
      style={{
        ...BalanceUpdatedButtonStyles,
        color: loading
          ? "var(--tg-theme-hint-color, #999999)"
          : "var(--tg-theme-link-color, #2481cc)",
      }}
    >
      <Typography
        component="span"
        variant="xs"
        color="hint"
        sx={{
          fontWeight: "inherit",
          color: loading
            ? "var(--tg-theme-hint-color, #999999)"
            : "var(--tg-theme-link-color, #2481cc)",
        }}
      >
        Refresh{loading && "ing"}
      </Typography>
      <Box
        component="span"
        sx={{
          padding: 0,
          color: loading
            ? "var(--tg-theme-hint-color, #999999)"
            : "var(--tg-theme-link-color, #2481cc)",
          "& svg": {
            ...BalanceUpdatedRefreshIconStyles,
            animationPlayState: loading ? "running" : "paused",
          },
        }}
      >
        <RefreshIcon
          sx={{
            color: loading
              ? "var(--tg-theme-hint-color, #999999)"
              : "var(--tg-theme-link-color, #2481cc)",
          }}
        />
      </Box>
    </button>
  );
};

const BalanceUpdatedButtonStyles = {
  background: "none",
  border: "none",
  padding: "0",
  margin: 0,
  boxShadow: "none",
  cursor: "pointer",
  fontSize: "12px",
  display: "inline-flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: "0px",
} as React.CSSProperties;

const BalanceUpdatedRefreshIconStyles = {
  WebkitAnimation: "spin 0.75s linear infinite",
  MozAnimation: "spin 0.75s linear infinite",
  animation: "spin 0.75s linear infinite",
  width: "20px",
  height: "20px",
  display: "block",
} as React.CSSProperties;

export default BalanceUpdatedButton;
