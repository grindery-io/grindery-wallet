import React from "react";
import { ListSubheader } from "@mui/material";

type DebugMenuListSubheaderProps = {
  label: string;
};

const DebugMenuListSubheader = ({ label }: DebugMenuListSubheaderProps) => {
  return (
    <ListSubheader component="div" sx={DebugMenuListSubheaderStyles}>
      {label}
    </ListSubheader>
  );
};

const DebugMenuListSubheaderStyles = {
  marginTop: "30px",
  backgroundColor: "var(--tg-theme-bg-color, #ffffff)",
  color: "var(--tg-theme-hint-color, #999999)",
  fontFamily: "Geologica",
};

export default DebugMenuListSubheader;
