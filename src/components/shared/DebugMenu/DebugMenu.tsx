import React from "react";
import { Box } from "@mui/material";
import DebugMenuHeader from "./DebugMenuHeader";
import DebugMenuList from "./DebugMenuList";

const DebugMenu = () => {
  return (
    <Box sx={DebugMenuStyles}>
      <DebugMenuHeader />
      <DebugMenuList />
    </Box>
  );
};

const DebugMenuStyles = {
  flex: 1,
  width: "100%",
  padding: "16px 0",
  backgroundColor: "var(--tg-theme-secondary-bg-color, #efeff3)",
};

export default DebugMenu;
