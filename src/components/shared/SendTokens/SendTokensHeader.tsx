import React from "react";
import { Box, IconButton, SxProps, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { selectAppStore, useAppSelector } from "../../../store";
import { SendStatus } from "../../../types/State";
import CloseIcon from "../../icons/CloseIcon";

const SendTokensHeader = () => {
  const navigate = useNavigate();
  const {
    user,
    send: { status, input },
  } = useAppSelector(selectAppStore);

  return (
    <Box sx={SendTokensHeaderStyles}>
      <Typography textAlign="center">
        {status === SendStatus.SENDING
          ? "Sending"
          : status === SendStatus.SENT
          ? "Sent"
          : user?.telegramSession
          ? `Send${!input.recipient ? " to" : ""}`
          : ""}
      </Typography>

      {status !== SendStatus.SENDING && (
        <IconButton
          sx={SendTokensHeaderCloseButtonStyles}
          onClick={() => {
            navigate(-1);
          }}
        >
          <CloseIcon />
        </IconButton>
      )}
    </Box>
  );
};

const SendTokensHeaderStyles = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  padding: "0 16px",
  boxSizing: "border-box",
} as SxProps;

const SendTokensHeaderCloseButtonStyles = {
  position: "absolute",
  right: "16px",
  top: "-4px",
  color: "var(--tg-theme-text-color, #000000)",
} as SxProps;

export default SendTokensHeader;
