import React from "react";
import { Divider } from "@mui/material";
import { selectAppStore, useAppSelector } from "../../../store";
import DebugMenuListItemUserId from "./DebugMenuListItemUserId";
import DebugMenuListItemUserName from "./DebugMenuListItemUserName";
import DebugMenuListItemTelegram from "./DebugMenuListItemTelegram";

const DebugMenuListUser = () => {
  const { user } = useAppSelector(selectAppStore);

  return (
    <>
      <DebugMenuListItemUserId />
      <Divider />
      {user?.userHandle && (
        <>
          <DebugMenuListItemUserName />
          <Divider />
        </>
      )}
      <DebugMenuListItemTelegram />
    </>
  );
};

export default DebugMenuListUser;
