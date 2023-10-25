import React from "react";
import { Divider } from "@mui/material";
import DebugMenuListItemAppPackage from "./DebugMenuListItemAppPackage";
import DebugMenuListItemAppVersion from "./DebugMenuListItemAppVersion";
import DebugMenuListItemApiVersion from "./DebugMenuListItemApiVersion";
import DebugMenuListItemAppId from "./DebugMenuListItemAppId";
import DebugMenuListItemPlatform from "./DebugMenuListItemPlatform";
import DebugMenuListItemCache from "./DebugMenuListItemCache";

const DebugMenuListApp = () => {
  return (
    <>
      <DebugMenuListItemAppPackage />
      <Divider />
      <DebugMenuListItemAppVersion />
      <Divider />
      {window.Telegram?.WebApp?.version && (
        <>
          <DebugMenuListItemApiVersion />
          <Divider />
        </>
      )}
      {process.env.REACT_APP_TELEGRAM_API_ID && (
        <>
          <DebugMenuListItemAppId />
          <Divider />
        </>
      )}
      <DebugMenuListItemPlatform />
      <Divider />
      <DebugMenuListItemCache />
    </>
  );
};

export default DebugMenuListApp;
