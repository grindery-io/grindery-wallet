import React from "react";
import { useNavigate } from "react-router";
import { Button } from "@mui/material";

const RewardCloseButton = () => {
  const navigate = useNavigate();

  return (
    <Button
      sx={{ marginTop: "24px" }}
      fullWidth
      variant="outlined"
      onClick={() => {
        setTimeout(() => {
          navigate(-1);
        }, 250);
      }}
    >
      Close
    </Button>
  );
};

export default RewardCloseButton;
