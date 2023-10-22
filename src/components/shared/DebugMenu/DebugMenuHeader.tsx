import React from "react";
import { Box, Typography } from "@mui/material";

const DebugMenuHeader = () => {
  return (
    <Box sx={DebugMenuHeaderStyles}>
      <Typography variant="title">⚠️</Typography>
      <Typography variant="sm" color="hint">
        Caution: Debug Mode. Use with expertise. Only proceed if you know what
        you are doing.
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
