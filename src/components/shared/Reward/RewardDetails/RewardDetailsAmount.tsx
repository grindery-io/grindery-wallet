import React from "react";
import TableRow from "../../TableRow/TableRow";
import { RewardProps } from "../Reward";

const RewardDetailsAmount = ({ reward }: RewardProps) => {
  return (
    <TableRow
      label="Reward amount"
      value={reward.amount}
      icon={
        <img
          src="/images/g1-token-red.svg"
          alt=""
          width="20"
          style={{ display: "inline-block" }}
        />
      }
    />
  );
};

export default RewardDetailsAmount;
