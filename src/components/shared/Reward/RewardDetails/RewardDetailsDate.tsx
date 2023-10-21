import React from "react";
import { RewardProps } from "../Reward";
import TableRow from "../../TableRow";
import moment from "moment";

const RewardDetailsDate = ({ reward }: RewardProps) => {
  return (
    <TableRow
      label="Reward received"
      value={moment(reward.dateAdded).fromNow()}
    />
  );
};

export default RewardDetailsDate;
