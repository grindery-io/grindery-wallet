import React from "react";
import { Divider } from "@mui/material";
import { selectAppStore, useAppSelector } from "../../../store";
import DebugMenuListSubheader from "./DebugMenuListSubheader";
import DebugMenuListItemUserId from "./DebugMenuListItemUserId";
import DebugMenuListItemUserName from "./DebugMenuListItemUserName";
import DebugMenuListItemTelegram from "./DebugMenuListItemTelegram";
import DebugMenuListItemUserAddress from "./DebugMenuListItemUserAddress";

const DebugMenuListUser = () => {
  const { user } = useAppSelector(selectAppStore);

  return (
    <>
      <DebugMenuListSubheader label="User info" />
      <DebugMenuListItemUserId />
      <Divider />
      {user?.userHandle && (
        <>
          <DebugMenuListItemUserName />
          <Divider />
        </>
      )}
      <DebugMenuListItemTelegram />
      <Divider />
      {user?.patchwallet && (
        <>
          <DebugMenuListItemUserAddress />
          <Divider />
        </>
      )}
    </>
  );
};

export default DebugMenuListUser;
