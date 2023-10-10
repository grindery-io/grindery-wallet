import React from "react";
import { Stack, Typography } from "@mui/material";

type Props = {
  label?: string | React.ReactNode;
  value?: string | React.ReactNode;
  icon?: string | React.ReactNode;
  first?: boolean;
  onValueClick?: () => void;
};

const TableRow = ({ label, value, icon, first, onValueClick }: Props) => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      spacing="16px"
      sx={{
        padding: "10px 16px",
        borderTop: !first ? "1px solid var(--gr-theme-divider-color)" : "none",
      }}
    >
      <Typography sx={{ lineHeight: "125%" }} variant="xs" color="hint">
        {label}
      </Typography>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        spacing="4px"
        useFlexGap
        sx={{
          cursor: onValueClick ? "pointer" : "default",
        }}
        tabIndex={onValueClick ? 0 : -1}
        onClick={onValueClick}
      >
        <Typography
          variant="xs"
          sx={{
            color: onValueClick
              ? "var(--tg-theme-link-color, #2481cc)"
              : undefined,
          }}
        >
          <strong>{value}</strong>
        </Typography>
        {icon}
      </Stack>
    </Stack>
  );
};

export default TableRow;
