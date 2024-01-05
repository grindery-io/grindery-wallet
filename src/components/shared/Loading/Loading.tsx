import React from "react";
import { Stack, CircularProgress, SxProps, Typography } from "@mui/material";

type Props = {
  title?: string;
  sx?: SxProps | React.CSSProperties;
};

const Loading = ({ title, sx }: Props) => {
  return (
    <Stack
      sx={{ margin: "20px", flex: 1, ...(sx || {}) }}
      alignItems="center"
      justifyContent="center"
      data-testid="loading"
      spacing="16px"
    >
      <CircularProgress
        style={{
          color: "var(--tg-theme-button-color, #2481cc)",
        }}
      />
      {title && (
        <Typography textAlign="center" color="hint">
          {title}
        </Typography>
      )}
    </Stack>
  );
};

export default Loading;
