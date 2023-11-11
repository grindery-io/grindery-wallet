import React from "react";
import { Stack, CircularProgress, SxProps } from "@mui/material";

type Props = {
  sx?: SxProps | React.CSSProperties;
};

const Loading = ({ sx }: Props) => {
  return (
    <Stack
      sx={{ margin: "20px", flex: 1, ...(sx || {}) }}
      alignItems="center"
      justifyContent="center"
      data-testid="loading"
    >
      <CircularProgress
        style={{
          color: "var(--tg-theme-button-color, #2481cc)",
        }}
      />
    </Stack>
  );
};

export default Loading;
