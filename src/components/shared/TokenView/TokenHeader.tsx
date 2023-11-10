import React from "react";
import { Box, Typography } from "@mui/material";
import TokenIcon from "../Token/TokenIcon";
import TokenName from "../Token/TokenName";

const TokenHeader = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          margin: "32px auto 24px",
          textAlign: "center",
        }}
      >
        <TokenIcon size={48} sx={{ margin: "0 auto" }} />
      </Box>
      <Typography
        variant="title"
        sx={{ textAlign: "center", marginBottom: "16px" }}
      >
        <TokenName />
      </Typography>
    </Box>
  );
};

export default TokenHeader;
