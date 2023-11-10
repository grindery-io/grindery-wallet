import React from "react";
import { useNavigate } from "react-router";
import { Button } from "@mui/material";

const TokenViewCloseButton = () => {
  const navigate = useNavigate();

  return (
    <Button
      sx={{ marginTop: "16px" }}
      fullWidth
      variant="outlined"
      onClick={() => {
        navigate(-1);
      }}
    >
      Close
    </Button>
  );
};

export default TokenViewCloseButton;
