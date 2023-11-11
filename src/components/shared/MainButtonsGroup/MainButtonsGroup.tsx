import React from "react";
import { Stack } from "@mui/material";
import { selectAppStore, useAppSelector } from "../../../store";
import MainButtonsGroupButtonSend from "./MainButtonsGroupButtonSend/MainButtonsGroupButtonSend";
import MainButtonsGroupButtonSwap from "./MainButtonsGroupButtonSwap/MainButtonsGroupButtonSwap";

const MainButtonsGroup = () => {
  const {
    debug: { features },
  } = useAppSelector(selectAppStore);

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      flexWrap="nowrap"
      useFlexGap
      spacing="16px"
      sx={{
        padding: "0 16px",
        width: "100%",
      }}
    >
      <MainButtonsGroupButtonSend label={features?.SWAP ? "Send" : undefined} />
      {features?.SWAP && <MainButtonsGroupButtonSwap label="Swap" />}
    </Stack>
  );
};

export default MainButtonsGroup;
