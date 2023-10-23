import React from "react";
import DebugMenuListItem from "./DebugMenuListItem";

const DebugMenuListItemApiVersion = () => {
  return (
    <DebugMenuListItem
      label="Bot API version"
      value={window.Telegram?.WebApp?.version}
    />
  );
};

export default DebugMenuListItemApiVersion;
