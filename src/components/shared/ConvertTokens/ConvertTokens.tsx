import React from "react";
import { Box } from "@mui/material";
import ConvertTokensHeader from "./ConvertTokensHeader";
import ConvertTokensInput from "./ConvertTokensInput/ConvertTokensInput";
import ConvertTokensOutput from "./ConvertTokensOutput/ConvertTokensOutput";
import ConvertTokensButton from "./ConvertTokensButton/ConvertTokensButton";
import ConvertTokensInfo from "./ConvertTokensInfo/ConvertTokensInfo";
import { selectAppStore, useAppSelector } from "store";
import { ConvertStatus } from "types";
import ConvertTokensSentMessage from "./ConvertTokensSentMessage";
import Loading from "../Loading/Loading";

const ConvertTokens = () => {
  const {
    convert: { status },
  } = useAppSelector(selectAppStore);
  return (
    <>
      {status === ConvertStatus.WAITING && (
        <Box sx={ConvertTokensStyles}>
          <ConvertTokensHeader />
          <ConvertTokensInput />
          <ConvertTokensOutput />
          <ConvertTokensButton />
          <ConvertTokensInfo />
        </Box>
      )}
      {status === ConvertStatus.SENDING && <Loading />}
      {status === ConvertStatus.SENT && <ConvertTokensSentMessage />}
    </>
  );
};

const ConvertTokensStyles = {
  width: "100%",
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
  justifyContent: "flex-start",
  gap: "0px",
  flexWrap: "nowrap",
};

export default ConvertTokens;
