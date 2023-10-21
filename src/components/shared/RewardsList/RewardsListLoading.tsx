import React from "react";
import { Box, CircularProgress } from "@mui/material";

const RewardsListLoading = () => {
  return (
    <Box
      sx={{
        textAlign: "center",
        margin: "50px 20px",
      }}
    >
      <CircularProgress
        sx={{ color: "var(--tg-theme-button-color, #2481cc)" }}
      />
    </Box>
  );
};

export default RewardsListLoading;
