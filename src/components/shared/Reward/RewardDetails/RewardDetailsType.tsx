import React from "react";
import TableRow from "../../TableRow";
import { RewardProps } from "../Reward";

const RewardDetailsType = ({ reward }: RewardProps) => {
  return (
    <TableRow
      first
      label="Reward type"
      value={
        reward.message || (
          <span style={{ color: "var(--tg-theme-hint-color, #999999)" }}>
            No message
          </span>
        )
      }
    />
  );
};

export default RewardDetailsType;
