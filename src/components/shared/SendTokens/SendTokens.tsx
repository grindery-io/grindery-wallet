import React from "react";
import { Box } from "@mui/material";
import { selectAppStore, useAppSelector } from "../../../store";
import SendTokensHeader from "./SendTokensHeader";
import SendTokensSentMessage from "./SendTokensSentMessage";
import SendTokensSendingMessage from "./SendTokensSendingMessage";
import SendTokensError from "./SendTokensError";
import SendTokensRecipientInput from "./SendTokensRecipientInput";
import SendTokensInput from "./SendTokensInput";

const SendTokens = () => {
  const { send } = useAppSelector(selectAppStore);
  const { status, input } = send;

  return (
    <>
      <Box sx={SendTokensStyles}>
        <SendTokensHeader />
        {!input.recipient ? (
          <SendTokensRecipientInput />
        ) : (
          <Box sx={SendTokensContentStyles}>
            {status === "sent" && <SendTokensSentMessage />}
            {status === "sending" && <SendTokensSendingMessage />}
            {status === "error" && <SendTokensError />}
            {status === "waiting_user_input" && <SendTokensInput />}
          </Box>
        )}
      </Box>
    </>
  );
};

const SendTokensStyles = {
  width: "100%",
  paddingTop: "16px",
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
  justifyContent: "flex-start",
  gap: "0px",
  flexWrap: "nowrap",
};

const SendTokensContentStyles = {
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
  justifyContent: "flex-start",
  gap: "20px",
  flexWrap: "nowrap",
  flex: 1,
  marginTop: "16px",
  padding: "0 16px",
};

export default SendTokens;
