import React from "react";
import TransactionIcon from "../../icons/TransactionIcon";
import { Box, Typography } from "@mui/material";

const ActivityHeader = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          margin: "32px auto 24px",
          textAlign: "center",
        }}
      >
        <TransactionIcon />
      </Box>
      <Typography
        variant="title"
        sx={{ textAlign: "center", marginBottom: "16px" }}
      >
        Transaction Details
      </Typography>
    </Box>
  );
};

export default ActivityHeader;
