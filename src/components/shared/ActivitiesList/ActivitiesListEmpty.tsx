import React from "react";
import { Typography } from "@mui/material";

const ActivitiesListEmpty = () => {
  return (
    <Typography
      sx={{
        margin: "50px 20px",
        textAlign: "center",
      }}
      color="hint"
    >
      You have no transactions.
    </Typography>
  );
};

export default ActivitiesListEmpty;
