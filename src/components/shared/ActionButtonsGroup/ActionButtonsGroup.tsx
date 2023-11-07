import React from "react";
import { Stack } from "@mui/material";
import ActionButtonsGroupButtonSend from "./ActionButtonsGroupButtonSend";
import { selectAppStore, useAppSelector } from "../../../store";
import ActionButtonsGroupButtonSwap from "./ActionButtonsGroupButtonSwap";

const ActionButtonsGroup = () => {
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
        padding: "16px",
        width: "100%",
      }}
    >
      <ActionButtonsGroupButtonSend
        label={features?.SWAP ? "Send" : undefined}
      />
      {features?.SWAP && <ActionButtonsGroupButtonSwap label="Swap" />}
    </Stack>
  );
};

export default ActionButtonsGroup;
