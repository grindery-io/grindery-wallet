import React from "react";
import { Box, Typography } from "@mui/material";

type Props = {
  label?: string | React.ReactNode;
  value?: string | React.ReactNode;
  icon?: string | React.ReactNode;
  first?: boolean;
  onValueClick?: () => void;
};

const TableRow = ({ label, value, icon, first, onValueClick }: Props) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "nowrap",
        gap: "16px",
        padding: "10px 16px",
        borderTop: !first
          ? "1px solid var(--tg-theme-bg-color, #ffffff)"
          : "none",
      }}
    >
      <Typography sx={{ lineHeight: "125%" }} variant="xs" color="hint">
        {label}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end",
          flexWrap: "nowrap",
          gap: "4px",
          color: "var(--tg-theme-text-color, #000000)",
          cursor: onValueClick ? "pointer" : "default",
        }}
        tabIndex={onValueClick ? 0 : -1}
        onClick={onValueClick}
      >
        <strong style={{ fontSize: "12px" }}>{value}</strong>
        {icon}
      </Box>
    </Box>
  );
};

export default TableRow;
