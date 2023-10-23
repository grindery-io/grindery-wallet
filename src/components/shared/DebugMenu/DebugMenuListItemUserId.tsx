import React from "react";
import DebugMenuListItem from "./DebugMenuListItem";
import { selectAppStore, useAppSelector } from "../../../store";

const DebugMenuListItemUserId = () => {
  const { user } = useAppSelector(selectAppStore);
  return (
    <DebugMenuListItem label="User ID" value={user?.userTelegramID || "N/A"} />
  );
};

export default DebugMenuListItemUserId;
