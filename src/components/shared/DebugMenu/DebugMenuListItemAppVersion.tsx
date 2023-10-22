import React from "react";
import appPackage from "../../../../package.json";
import DebugMenuListItem from "./DebugMenuListItem";

const DebugMenuListItemAppVersion = () => {
  return <DebugMenuListItem label="App version" value={appPackage.version} />;
};

export default DebugMenuListItemAppVersion;
