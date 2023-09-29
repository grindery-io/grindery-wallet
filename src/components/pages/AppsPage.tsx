import React from "react";
import BottomNavigation from "../shared/BottomNavigation";
import AppHeader from "../shared/AppHeader";
import { Typography } from "@mui/material";

const AppsPage = () => {
  return (
    <>
      <AppHeader />
      <div style={{ width: "100%" }}>
        <Typography
          variant="h6"
          sx={{
            margin: "16px 0",
            padding: "0",
            textAlign: "center",
            position: "sticky",
            top: "0px",
            background: "#fff",
            zIndex: 1,
            width: "100%",
          }}
        >
          Apps
        </Typography>
        <div style={{ textAlign: "center", margin: "50px" }}>
          <Typography color="GrayText">Coming soon</Typography>
        </div>
      </div>

      <BottomNavigation />
    </>
  );
};

export default AppsPage;