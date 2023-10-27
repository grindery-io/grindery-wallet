import React from "react";
import DebugMenuListItem from "./DebugMenuListItem";
import LinkIcon from "../../icons/LinkIcon";

const url =
  process.env.REACT_APP_ENV === "production"
    ? "https://wallet.grindery.io"
    : "https://wallet-staging.grindery.io";

const DebugMenuListFeaturesWebVersion = () => {
  return (
    <DebugMenuListItem
      label="Web version (alpha, not stable)"
      value={
        <button
          onClick={() => {
            if (window.Telegram?.WebApp?.openLink) {
              window.Telegram.WebApp.openLink(
                `${url}?${window.Telegram?.WebApp?.initData || ""}`
              );
            } else {
              window.open(
                `${url}?${window.Telegram?.WebApp?.initData || ""}`,
                "_blank"
              );
            }
          }}
          style={{
            ...UserAddressButtonStyles,
            border: "none",
            padding: 0,
          }}
        >
          <span style={UserAddressTextStyles}>Open</span>
          <span>
            <LinkIcon />
          </span>
        </button>
      }
    />
  );
};

const UserAddressButtonStyles: React.CSSProperties = {
  cursor: "pointer",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  width: "auto",
  margin: "0 auto",
  borderRadius: "34px",
  gap: "10px",
  background: "transparent",
  color: "var(--tg-theme-link-color, #2481cc)",
};

const UserAddressTextStyles = {
  color: "var(--tg-theme-link-color, #2481cc)",
  fontWeight: "400",
  fontSize: "14px",
  lineHeight: "150%",
  fontFamily: "Geologica",
};

export default DebugMenuListFeaturesWebVersion;
