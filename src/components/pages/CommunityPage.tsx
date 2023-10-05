import React from "react";
import BottomNavigation from "../shared/BottomNavigation";
import { Typography } from "@mui/material";
import Title from "../shared/Title";

const CommunityPage = () => {
  return (
    <>
      <div style={{ width: "100%", paddingTop: "24px" }}>
        <Title>Community</Title>
        <div style={{ textAlign: "center", margin: "50px" }}>
          <Typography sx={{ color: "var(--tg-theme-hint-color, #999999)" }}>
            Coming soon
          </Typography>
        </div>
      </div>

      <BottomNavigation />
    </>
  );
};

export default CommunityPage;
