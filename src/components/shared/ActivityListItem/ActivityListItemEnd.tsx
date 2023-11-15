import React from "react";
import { formatBalance } from "../../../utils/formatBalance";
import { Stack, Typography } from "@mui/material";
import { selectAppStore, useAppSelector } from "../../../store";
import { ActivityListItemProps } from "./ActivityListItem";
import { Token, TokenIcon } from "../Token";

/**
 * Single activity list item end component
 */
const ActivityListItemEnd = (props: ActivityListItemProps) => {
  const { activity } = props;
  const { user, debug, tokens } = useAppSelector(selectAppStore);

  const { formatted } = formatBalance(parseFloat(activity.tokenAmount));

  const coloredNumbersEnabled = debug.features?.COLORED_NUMBERS;

  const token = tokens.find(
    (token) =>
      token.address.toLowerCase() === activity?.tokenAddress?.toLowerCase()
  );

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
      <Token token={token || tokens[0]}>
        <TokenIcon size={16} />
      </Token>
    </Stack>
  );
};

export default ActivityListItemEnd;
