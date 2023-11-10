import React from "react";
import { Box, Typography } from "@mui/material";
import { TokenIcon, TokenName } from "../../Token";

const TokenViewHeader = () => {
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

export default TokenViewHeader;
