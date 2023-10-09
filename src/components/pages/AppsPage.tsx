import React from "react";
import BottomNavigation from "../shared/BottomNavigation";
import { Box, Typography } from "@mui/material";

const AppsPage = () => {
  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Typography
          variant="title"
          sx={{
            margin: "16px 0",
            textAlign: "center",
            position: "sticky",
            top: "0px",
            background: "var(--tg-theme-bg-color, #ffffff)",
            zIndex: 1,
            width: "100%",
          }}
        >
          Apps
        </Typography>
        <Box sx={{ textAlign: "center", margin: "50px" }}>
          <Typography color="hint">Coming soon</Typography>
        </Box>
      </Box>

      <BottomNavigation />
    </>
  );
};

export default AppsPage;
