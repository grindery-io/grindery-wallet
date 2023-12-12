import React from "react";
import { Box } from "@mui/material";
import ConvertTokensHeader from "./ConvertTokensHeader";
import CovertTokensInput from "./CovertTokensInput/CovertTokensInput";
import ConvertTokensOutput from "./ConvertTokensOutput/ConvertTokensOutput";
import ConvertTokensButton from "./ConvertTokensButton/ConvertTokensButton";
import ConvertTokensInfo from "./ConvertTokensInfo/ConvertTokensInfo";

const ConvertTokens = () => {
  return (
    <>
      <Box sx={ConvertTokensStyles}>
        <ConvertTokensHeader />
        <CovertTokensInput />
        <ConvertTokensOutput />
        <ConvertTokensButton />
        <ConvertTokensInfo />
      </Box>
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
