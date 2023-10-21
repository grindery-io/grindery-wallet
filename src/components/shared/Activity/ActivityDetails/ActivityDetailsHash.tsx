import React from "react";
import TableRow from "../../TableRow";
import LinkIcon from "../../../icons/LinkIcon";
import { ActivityProps } from "../Activity";

const ActivityDetailsHash = ({ activity }: ActivityProps) => {
  return activity?.transactionHash ? (
    <TableRow
      label="Transaction hash"
      value={
        <span
          style={{
            cursor: "pointer",
            color: "var(--tg-theme-link-color, #2481cc)",
          }}
        >
          {activity?.transactionHash.substring(0, 6) +
            "..." +
            activity?.transactionHash.substring(
              activity?.transactionHash.length - 4
            )}
        </span>
      }
      onValueClick={() => {
        if (window.Telegram?.WebApp?.openLink) {
          window.Telegram.WebApp.openLink(
            `https://polygonscan.com/tx/${activity?.transactionHash}`
          );
        } else {
          window.open(
            `https://polygonscan.com/tx/${activity?.transactionHash}`,
            "_blank"
          );
        }
      }}
      icon={
        <LinkIcon
          sx={{
            color: "var(--tg-theme-link-color, #2481cc)",
            width: "12px",
            height: "12px",
          }}
        />
      }
    />
  ) : null;
};

export default ActivityDetailsHash;
