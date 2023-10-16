import React from "react";
import useAppContext from "../../../hooks/useAppContext";
import { formatBalance } from "../../../utils/formatBalance";
import { Stack, Typography } from "@mui/material";
import { ActivityProps } from "./Activity";
import { selectAppStore, useAppSelector } from "../../../store";

/**
 * Single activity list item end component
 */
const ActivityEnd = (props: ActivityProps) => {
  const { activity } = props;
  const { user } = useAppSelector(selectAppStore);
  const {
    state: { devMode },
  } = useAppContext();

  const { formatted } = formatBalance(parseFloat(activity.tokenAmount));

  const coloredNumbersEnabled = devMode.features?.COLORED_NUMBERS;

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="flex-end"
      spacing="6px"
      ml="auto"
    >
      <Typography
        variant="sm"
        sx={{
          letterSpacing: "0.55px",
          fontWeight: "bold",
          color:
            coloredNumbersEnabled &&
            user?.userTelegramID !== activity.senderTgId
              ? "var(--gr-theme-success-color)"
              : undefined,
        }}
      >
        {coloredNumbersEnabled && (
          <>{user?.userTelegramID === activity.senderTgId ? "-" : "+"}</>
        )}
        {formatted}
      </Typography>{" "}
      <img
        src="/images/g1-token-red.svg"
        alt=""
        width="16"
        style={{ display: "block" }}
      />
    </Stack>
  );
};

export default ActivityEnd;
