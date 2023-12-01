import React from "react";
import { Stack } from "@mui/material";
import { selectAppStore, useAppSelector } from "../../../store";
import MainButtonsGroupButtonSend from "./MainButtonsGroupButtonSend/MainButtonsGroupButtonSend";
import MainButtonsGroupButtonSwap from "./MainButtonsGroupButtonSwap/MainButtonsGroupButtonSwap";
import MainButtonsGroupButtonBridge from "./MainButtonsGroupButtonBridge/MainButtonsGroupButtonMainButtonsGroupButtonBridge";
import MainButtonsGroupButtonBuy from "./MainButtonsGroupButtonBuy/MainButtonsGroupButtonBuy";

const MainButtonsGroup = () => {
  const {
    debug: { enabled, features },
  } = useAppSelector(selectAppStore);

  const buttonsNum =
    1 +
    (enabled && features?.SWAP ? 1 : 0) +
    (enabled && features?.BRIDGE ? 1 : 0) +
    (enabled && features?.ON_RAMP ? 1 : 0);

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
      {enabled && features?.ON_RAMP && (
        <MainButtonsGroupButtonBuy label="Buy" withIcon={buttonsNum < 4} />
      )}
      <MainButtonsGroupButtonSend
        label={enabled && features?.SWAP ? "Send" : undefined}
        withIcon={buttonsNum < 4}
      />
      {enabled && features?.SWAP && (
        <MainButtonsGroupButtonSwap label="Swap" withIcon={buttonsNum < 4} />
      )}
      {enabled && features?.BRIDGE && (
        <MainButtonsGroupButtonBridge
          label="Bridge"
          withIcon={buttonsNum < 4}
        />
      )}
    </Stack>
  );
};

export default MainButtonsGroup;
