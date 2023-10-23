import React from "react";
import DebugMenuListItem from "./DebugMenuListItem";

type Props = {};

const DebugMenuListItemAppId = (props: Props) => {
  return (
    <DebugMenuListItem
      label="Telegram Client App ID"
      value={process.env.REACT_APP_TELEGRAM_API_ID}
    />
  );
};

export default DebugMenuListItemAppId;
