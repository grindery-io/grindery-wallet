import React from "react";
import { Box, List } from "@mui/material";
import { selectAppStore, useAppSelector } from "../../../store";
import DebugMenuListItemMode from "./DebugMenuListItemMode";
import DebugMenuListDescription from "./DebugMenuListDescription";
import DebugMenuListFeatures from "./DebugMenuListFeatures";
import DebugMenuListApp from "./DebugMenuListApp";
import DebugMenuListUser from "./DebugMenuListUser";
import DebugMenuListSubheader from "./DebugMenuListSubheader";

const DebugMenuList = () => {
  const { debug } = useAppSelector(selectAppStore);

  return (
    <Box sx={DebugMenuListStyles}>
      <List>
        <DebugMenuListItemMode />
      </List>
      {!debug.enabled && <DebugMenuListDescription />}
      {debug.enabled && (
        <>
          <DebugMenuListSubheader label="App info" />
          <List>
            <DebugMenuListApp />
          </List>
          <DebugMenuListSubheader label="User info" />
          <List>
            <DebugMenuListUser />
          </List>
          <DebugMenuListSubheader label="Experimental features" />
          <List>
            <DebugMenuListFeatures />
          </List>
        </>
      )}
    </Box>
  );
};

const DebugMenuListStyles = {
  "& .MuiListItemText-primary": {
    fontSize: "14px",
  },
  "& .MuiListItemText-secondary": {
    fontSize: "14px",
  },
  "& .MuiList-root": {
    margin: "0 16px",
    backgroundColor: "var(--tg-theme-bg-color, #ffffff)",
    borderRadius: "5px",
    padding: 0,
  },
};

export default DebugMenuList;
