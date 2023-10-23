import React from "react";
import { List } from "@mui/material";
import { selectAppStore, useAppSelector } from "../../../store";
import DebugMenuListItemMode from "./DebugMenuListItemMode";
import DebugMenuListDescription from "./DebugMenuListDescription";
import DebugMenuListFeatures from "./DebugMenuListFeatures";
import DebugMenuListApp from "./DebugMenuListApp";
import DebugMenuListUser from "./DebugMenuListUser";

const DebugMenuList = () => {
  const { debug } = useAppSelector(selectAppStore);

  return (
    <List sx={DebugMenuListStyles}>
      <DebugMenuListItemMode />
      {!debug.enabled && <DebugMenuListDescription />}
      {debug.enabled && (
        <>
          <DebugMenuListApp />
          <DebugMenuListUser />

          <DebugMenuListFeatures />
        </>
      )}
    </List>
  );
};

const DebugMenuListStyles = {
  "& .MuiListItemText-primary": {
    fontSize: "14px",
  },
  "& .MuiListItemText-secondary": {
    fontSize: "14px",
  },
};

export default DebugMenuList;
