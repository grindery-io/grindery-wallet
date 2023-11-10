import React from "react";
import TableRow from "../../TableRow";
import LinkIcon from "../../../icons/LinkIcon";
import TokenAddress from "../../Token/TokenAddress/TokenAddress";
import { useToken } from "../../Token/Token";

const TokenDetailsAddress = () => {
  const { address } = useToken();

  return address !== "0x0" &&
    address !== "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee" ? (
    <TableRow
      label="Contract address"
      value={
        <span
          style={{
            cursor: "pointer",
            color: "var(--tg-theme-link-color, #2481cc)",
          }}
        >
          <TokenAddress format="short" />
        </span>
      }
      onValueClick={() => {
        if (window.Telegram?.WebApp?.openLink) {
          window.Telegram.WebApp.openLink(
            `https://polygonscan.com/token/${address}`
          );
        } else {
          window.open(`https://polygonscan.com/token/${address}`, "_blank");
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
