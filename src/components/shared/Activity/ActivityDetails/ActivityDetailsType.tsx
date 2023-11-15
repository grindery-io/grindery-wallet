import React from "react";
import TableRow from "../../TableRow";
import { selectAppStore, useAppSelector } from "../../../../store";
import { ActivityProps } from "../Activity";
import { Token, TokenIcon, TokenSymbol } from "../../Token";
import { Tooltip, Box } from "@mui/material";

const ActivityDetailsType = ({ activity }: ActivityProps) => {
  const { user, debug, tokens } = useAppSelector(selectAppStore);

  const token = tokens.find(
    (token) =>
      token.address.toLowerCase() === activity?.tokenAddress?.toLowerCase()
  );

  return (
    <TableRow
      first
      label={`Tokens ${
        activity?.recipientTgId !== user?.userTelegramID ? "sent" : "received"
      } `}
      value={
        <span
          style={{
            color:
              debug.features?.COLORED_NUMBERS &&
              activity?.recipientTgId === user?.userTelegramID
                ? "var(--gr-theme-success-color)"
                : "inherit",
          }}
        >
          {debug.features?.COLORED_NUMBERS && (
            <>{activity?.recipientTgId !== user?.userTelegramID ? "-" : "+"}</>
          )}
          {activity?.tokenAmount}
        </span>
      }
      icon={
        <Token token={token || tokens[0]}>
          <Tooltip title={<TokenSymbol />}>
            <Box>
              <TokenIcon size={20} />
            </Box>
          </Tooltip>
        </Token>
      }
    />
  );
};

export default ActivityDetailsType;
