import React from "react";
import TableRow from "../../TableRow/TableRow";
import moment from "moment";
import { ActivityProps } from "../Activity";

const ActivityDetailsDate = ({ activity }: ActivityProps) => {
  return (
    <TableRow
      label="Transaction sent date"
      value={moment(activity?.dateAdded).fromNow()}
    />
  );
};

export default ActivityDetailsDate;
