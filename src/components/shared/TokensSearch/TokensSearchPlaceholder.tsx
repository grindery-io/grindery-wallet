import React from "react";
import { Typography } from "@mui/material";
import Loading from "../Loading/Loading";

const TokensSearchPlaceholder = ({ loading }: { loading: boolean }) => {
  return loading ? (
    <Loading />
  ) : (
    <Typography
      sx={{
        margin: "50px 20px",
        textAlign: "center",
      }}
      color="hint"
    >
      Nothing found
    </Typography>
  );
};

export default TokensSearchPlaceholder;
