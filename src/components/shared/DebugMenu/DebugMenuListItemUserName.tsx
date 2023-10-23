import React from "react";
import DebugMenuListItem from "./DebugMenuListItem";
import { selectAppStore, useAppSelector } from "../../../store";

const DebugMenuListItemUserName = () => {
  const { user } = useAppSelector(selectAppStore);
  return (
    <DebugMenuListItem
      label="Username"
      value={`@${user?.userHandle}`}
      onValueClick={() => {
        if (typeof window.Telegram?.WebApp?.openTelegramLink !== "undefined") {
          window.Telegram?.WebApp?.openTelegramLink(
            "https://t.me/" + user?.userHandle
          );
        } else {
          window.open("https://t.me/" + user?.userHandle, "_blank");
        }
      }}
    />
  );
};

export default DebugMenuListItemUserName;
