import React from "react";
import { Typography } from "@mui/material";

const CommunityListEmpty = () => {
  return (
    <Typography
      style={{
        margin: "50px 20px",
        textAlign: "center",
      }}
      color="hint"
    >
      Nothing found
    </Typography>
  );
};

export default CommunityListEmpty;
