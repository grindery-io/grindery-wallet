import React from "react";
import { TokenProps } from "./Token";
import { Box, Typography } from "@mui/material";

const TokenHeader = ({ token }: TokenProps) => {
  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          margin: "32px auto 24px",
          textAlign: "center",
        }}
      >
        <img
          src={token.logoURI}
          alt=""
          style={{
            width: "48px",
            height: "48px",
            display: "block",
            margin: "0 auto",
            borderRadius: "50%",
          }}
        />
      </Box>
      <Typography
        variant="title"
        sx={{ textAlign: "center", marginBottom: "16px" }}
      >
        {token.name}
      </Typography>
    </Box>
  );
};

export default TokenHeader;
