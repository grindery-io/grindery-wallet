import React from "react";
import { Typography } from "@mui/material";

const RewardsListEmpty = () => {
  return (
    <Typography
      sx={{
        margin: "50px 20px",
        textAlign: "center",
      }}
      color="hint"
    >
      You have no rewards.
    </Typography>
  );
};

export default RewardsListEmpty;
