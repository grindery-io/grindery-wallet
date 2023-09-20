import React from "react";
import { Typography } from "@mui/material";

const Tokens = () => {
  return (
    <div style={{ width: "100%" }}>
      <Typography
        variant="h6"
        sx={{
          margin: "0 0 8px",
          padding: "0 0 2px",
          textAlign: "left",
          position: "sticky",
          top: "61px",
          background: "#fff",
          zIndex: 1,
        }}
      >
        Tokens
      </Typography>
      <div style={{ textAlign: "center", margin: "50px" }}>
        <Typography color="GrayText">Coming soon</Typography>
      </div>
    </div>
  );
};

export default Tokens;
