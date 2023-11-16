import React from "react";
import TableRow from "../../TableRow/TableRow";
import { RewardProps } from "../Reward";
import LinkIcon from "../../../icons/LinkIcon";

const RewardDetailsHash = ({ reward }: RewardProps) => {
  return reward.transactionHash ? (
    <TableRow
      label="Transaction hash"
      value={
        <span
          style={{
            cursor: "pointer",
            color: "var(--tg-theme-link-color, #2481cc)",
          }}
        >
          {reward.transactionHash.substring(0, 6) +
            "..." +
            reward.transactionHash.substring(reward.transactionHash.length - 4)}
        </span>
      }
      onValueClick={() => {
        if (window.Telegram?.WebApp?.openLink) {
          window.Telegram.WebApp.openLink(
            `https://polygonscan.com/tx/${reward.transactionHash}`
          );
        } else {
          window.open(
            `https://polygonscan.com/tx/${reward.transactionHash}`,
            "_blank"
          );
        }
      }}
      icon={<LinkIcon />}
    />
  ) : null;
};

export default RewardDetailsHash;
