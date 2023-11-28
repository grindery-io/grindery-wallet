import React from "react";
import { Stack } from "@mui/material";
import { selectAppStore, useAppSelector } from "../../../store";
import MainButtonsGroupButtonSend from "./MainButtonsGroupButtonSend/MainButtonsGroupButtonSend";
import MainButtonsGroupButtonSwap from "./MainButtonsGroupButtonSwap/MainButtonsGroupButtonSwap";
import MainButtonsGroupButtonBridge from "./MainButtonsGroupButtonBridge/MainButtonsGroupButtonMainButtonsGroupButtonBridge";

const MainButtonsGroup = () => {
  const {
    debug: { enabled, features },
  } = useAppSelector(selectAppStore);

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      flexWrap="nowrap"
      useFlexGap
      spacing="8px"
      sx={{
        padding: "0 16px",
        width: "100%",
      }}
    >
      <MainButtonsGroupButtonSend label="Send" />
      <MainButtonsGroupButtonSwap label="Swap" />
      {enabled && features?.BRIDGE && (
        <MainButtonsGroupButtonBridge label="Bridge" />
      )}
    </Stack>
  );
};

export default MainButtonsGroup;
