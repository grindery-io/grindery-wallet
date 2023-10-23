import React from "react";
import DebugMenuListItem from "./DebugMenuListItem";
import { selectAppStore, useAppSelector } from "../../../store";

const DebugMenuListItemTelegram = () => {
  const { user } = useAppSelector(selectAppStore);
  return (
    <DebugMenuListItem
      label="Telegram account connected"
      value={user?.telegramSession ? "Yes" : "No"}
    />
  );
};

export default DebugMenuListItemTelegram;
