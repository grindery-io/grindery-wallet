import React from "react";
import TableRow from "../../TableRow";
import { TRANSACTION_STATUS } from "../../../../constants";
import { ActivityProps } from "../Activity";

const ActivityDetailsStatus = ({ activity }: ActivityProps) => {
  const renderItemStatus = (status: string) => {
    switch (status) {
      case TRANSACTION_STATUS.PENDING:
        return "Pending";
      case TRANSACTION_STATUS.PENDING_HASH:
        return "Pending";
      case TRANSACTION_STATUS.SUCCESS:
        return "Completed";
      case TRANSACTION_STATUS.FAILURE:
        return "Failed";
      default:
        return "Unknown";
    }
  };

  return activity?.status ? (
    <TableRow
      label="Transaction status"
      value={renderItemStatus(activity?.status)}
    />
  ) : null;
};

export default ActivityDetailsStatus;
