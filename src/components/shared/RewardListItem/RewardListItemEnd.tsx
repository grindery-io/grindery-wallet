import React from "react";
import moment from "moment";
import { formatBalance } from "../../../utils/formatBalance";
import { Box, Stack, Typography } from "@mui/material";
import { RewardListItemProps } from "./RewardListItem";
import CompleteIcon from "../../icons/CompleteIcon";

const RewardListItemEnd = ({ reward }: RewardListItemProps) => {
  const { formatted } = formatBalance(parseFloat(reward.amount));

  return (
    <Box ml="auto">
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        spacing="6px"
      >
        <Typography
          variant="sm"
          style={{
            fontWeight: "bold",
          }}
        >
          {formatted}
        </Typography>
        <img
          src="/images/g1-token-red.svg"
          alt=""
          width="16"
          style={{ display: "inline-block" }}
        />
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        spacing="4px"
        style={{
          margin: "4px 0 0",
        }}
      >
        <Typography
          variant="xs"
          style={{
            color: "var(--flow-status-success-success-50-base, #00B674)",
          }}
        >
          Received {moment(reward.dateAdded).fromNow()}
        </Typography>
        <CompleteIcon />
      </Stack>
    </Box>
  );
};

export default RewardListItemEnd;
