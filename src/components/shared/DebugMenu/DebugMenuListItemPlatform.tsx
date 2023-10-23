import React from "react";
import DebugMenuListItem from "./DebugMenuListItem";

type Props = {};

const DebugMenuListItemPlatform = (props: Props) => {
  return (
    <DebugMenuListItem
      label="Platform"
      value={window.Telegram?.WebApp?.platform || "web browser"}
    />
  );
};

export default DebugMenuListItemPlatform;
