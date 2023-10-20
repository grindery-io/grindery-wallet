import React from "react";
import { formatBalance } from "../../../utils/formatBalance";
import { Stack, Typography } from "@mui/material";
import { selectAppStore, useAppSelector } from "../../../store";
import { ActivityListItemProps } from "./ActivityListItem";

/**
 * Single activity list item end component
 */
const ActivityListItemEnd = (props: ActivityListItemProps) => {
  const { activity } = props;
  const { user, debug } = useAppSelector(selectAppStore);

  const { formatted } = formatBalance(parseFloat(activity.tokenAmount));

  const coloredNumbersEnabled = debug.features?.COLORED_NUMBERS;

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

export default ActivityListItemEnd;
