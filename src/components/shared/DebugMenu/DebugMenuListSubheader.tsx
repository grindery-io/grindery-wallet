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
  margin: "20px 16px 10px",
  color: "var(--tg-theme-hint-color, #999999)",
  fontFamily: "Geologica",
  position: "relative",
  backgroundColor: "transparent",
  lineHeight: 1.5,
};

export default DebugMenuListSubheader;
