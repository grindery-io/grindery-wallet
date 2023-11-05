import React from "react";
import useBackButton from "../../hooks/useBackButton";
import { Box, Typography } from "@mui/material";

const TokensImportPage = () => {
  useBackButton();

  return (
    <Box sx={{ textAlign: "center", margin: "50px" }}>
      <Typography sx={{ color: "var(--tg-theme-hint-color, #999999)" }}>
        Coming soon
      </Typography>
    </Box>
  );
};

export default TokensImportPage;
