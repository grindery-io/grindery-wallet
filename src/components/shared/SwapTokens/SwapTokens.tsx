import React from "react";
import { Box } from "@mui/material";
import { selectAppStore, useAppSelector } from "../../../store";
import { SwapStatus } from "../../../types/State";
import SendTokensInput from "./SwapTokensInput/SwapTokensInput";
import SwapTokensHeader from "./SwapTokensHeader";
import SwapTokensError from "./SwapTokensError";
import SwapTokensSentMessage from "./SwapTokensSentMessage";
import SwapTokensSending from "./SwapTokensSending";

const SwapTokens = () => {
  const { swap } = useAppSelector(selectAppStore);
  const { status } = swap;

  return (
    <>
      <Box sx={SwapTokensStyles}>
        <SwapTokensHeader />
        <Box sx={SwapTokensContentStyles}>
          {status === SwapStatus.SENT && <SwapTokensSentMessage />}
          {status === SwapStatus.SENDING && <SwapTokensSending />}
          {status === SwapStatus.ERROR && <SwapTokensError />}
          {status === SwapStatus.WAITING && <SendTokensInput />}
        </Box>
      </Box>
    </>
  );
};

const SwapTokensStyles = {
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

const SwapTokensContentStyles = {
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

export default SwapTokens;
