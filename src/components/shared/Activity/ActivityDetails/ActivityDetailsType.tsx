import React from "react";
import TableRow from "../../TableRow";
import { selectAppStore, useAppSelector } from "../../../../store";
import { ActivityProps } from "../Activity";

const ActivityDetailsType = ({ activity }: ActivityProps) => {
  const { user, debug } = useAppSelector(selectAppStore);

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

export default ActivityDetailsType;
