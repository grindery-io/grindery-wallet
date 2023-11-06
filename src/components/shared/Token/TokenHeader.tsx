import React from "react";
import { TokenProps } from "./Token";
import { Box, Typography } from "@mui/material";
import TokenIcon from "../TokenIcon";

const TokenHeader = ({ token }: TokenProps) => {
  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          margin: "32px auto 24px",
          textAlign: "center",
        }}
      >
        <TokenIcon url={token.logoURI} size={48} sx={{ margin: "0 auto" }} />
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
