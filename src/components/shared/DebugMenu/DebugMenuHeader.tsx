import React from "react";
import { Box, Typography } from "@mui/material";

const DebugMenuHeader = () => {
  return (
    <Box sx={DebugMenuHeaderStyles}>
      <Typography variant="title">⚠️</Typography>
      <Typography variant="sm" color="hint">
        <strong>Use at Your Own Risk:</strong> Please be aware that features
        available in the debug mode are still under development and testing.
        They are provided on an "as is" and "as available" basis. We do not
        guarantee their accuracy, reliability, or permanence.
      </Typography>
    </Box>
  );
};

const DebugMenuHeaderStyles = {
  textAlign: "center",
  margin: "4px 20px 20px",
  "& > p:nth-child(2)": {
    marginTop: "4px",
  },
};

export default DebugMenuHeader;
