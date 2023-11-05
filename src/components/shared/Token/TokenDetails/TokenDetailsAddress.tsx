import React from "react";
import TableRow from "../../TableRow";
import LinkIcon from "../../../icons/LinkIcon";
import { TokenProps } from "../Token";

const TokenDetailsAddress = ({ token }: TokenProps) => {
  return token.address !== "0x0" &&
    token.address !== "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee" ? (
    <TableRow
      label="Contract address"
      value={
        <span
          style={{
            cursor: "pointer",
            color: "var(--tg-theme-link-color, #2481cc)",
          }}
        >
          {token.address.substring(0, 6) +
            "..." +
            token.address.substring(token.address.length - 4)}
        </span>
      }
      onValueClick={() => {
        if (window.Telegram?.WebApp?.openLink) {
          window.Telegram.WebApp.openLink(
            `https://polygonscan.com/token/${token.address}`
          );
        } else {
          window.open(
            `https://polygonscan.com/token/${token.address}`,
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

export default TokenDetailsAddress;
