import React from "react";
import { Typography } from "@mui/material";

const NFTs = () => {
  return (
    <div style={{ width: "100%" }}>
      <Typography
        variant="h6"
        sx={{
          margin: "0 0 8px",
          padding: "0 0 2px",
          textAlign: "left",
          position: "sticky",
          top: "0px",
          background: "#fff",
          zIndex: 1,
        }}
      >
        NFTs
      </Typography>
      <div style={{ textAlign: "center", margin: "50px" }}>
        <Typography color="GrayText">Coming soon</Typography>
      </div>
    </div>
  );
};

export default NFTs;
