import React from "react";
import { Box, SxProps } from "@mui/material";
import { useToken } from "./Token";

export type TokenNameProps = {
  sx?: SxProps | React.CSSProperties;
};

const TokenName = ({ sx }: TokenNameProps) => {
  const { name } = useToken();
  return name ? (
    <Box sx={sx} component="span">
      {name}
    </Box>
  ) : null;
};

export default TokenName;
