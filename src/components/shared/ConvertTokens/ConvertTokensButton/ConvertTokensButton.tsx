import { Box, Button } from "@mui/material";
import React from "react";

type ConvertTokensButtonProps = {};

const ConvertTokensButton = (props: ConvertTokensButtonProps) => {
  return (
    <Box sx={{ margin: "auto 16px 0" }}>
      <Button variant="contained" color="primary" fullWidth>
        Pre-order
      </Button>
    </Box>
  );
};

export default ConvertTokensButton;
