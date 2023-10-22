import React from "react";
import { Box, Typography } from "@mui/material";

const DebugMenuListDescription = () => {
  return (
    <Box sx={DebugMenuListDescriptionStyles}>
      <Typography variant="title">🛠️</Typography>
      <Typography color="hint" variant="sm" sx={{ marginTop: "8px" }}>
        Enable debug mode to access experimental features and app information
      </Typography>
    </Box>
  );
};

const DebugMenuListDescriptionStyles = {
  margin: "32px 20px",
  textAlign: "center",
};

export default DebugMenuListDescription;
