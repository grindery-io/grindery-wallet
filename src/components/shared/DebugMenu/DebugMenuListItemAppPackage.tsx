import React from "react";
import appPackage from "../../../../package.json";
import DebugMenuListItem from "./DebugMenuListItem";

const DebugMenuListItemAppPackage = () => {
  return <DebugMenuListItem label="App package" value={appPackage.name} />;
};

export default DebugMenuListItemAppPackage;
