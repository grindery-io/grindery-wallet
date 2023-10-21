import React from "react";
import TableRow from "../../TableRow";
import { TRANSACTION_STATUS } from "../../../../constants";
import { RewardProps } from "../Reward";

const RewardDetailsStatus = (props: RewardProps) => {
  const { reward } = props;

  const renderItemStatus = (status: string) => {
    switch (status) {
      case TRANSACTION_STATUS.PENDING:
        return "Pending";
      case TRANSACTION_STATUS.SUCCESS:
        return "Completed";
      case TRANSACTION_STATUS.FAILURE:
        return "Failed";
      default:
        return "Unknown";
    }
  };

  return reward?.status ? (
    <TableRow
      label="Transaction status"
      value={renderItemStatus(reward?.status)}
    />
  ) : null;
};

export default RewardDetailsStatus;
