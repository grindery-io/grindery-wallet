import React from "react";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router";
import { ICONS } from "../../constants";
import { selectAppStore, useAppSelector } from "../../store";

const SendButton = () => {
  const { user } = useAppSelector(selectAppStore);

  let navigate = useNavigate();
  return (
    <Box sx={{ width: "100%", padding: "0 16px" }}>
      <Button
        startIcon={
          <img
            src={ICONS.ARROW_OPEN}
            alt=""
            style={{ width: "16px", height: "16px", display: "block" }}
          />
        }
        variant="contained"
        fullWidth
        disabled={!user?.patchwallet}
        onClick={() => {
          setTimeout(() => {
            navigate("/send");
          }, 250);
        }}
      >
        Send tokens
      </Button>
    </Box>
  );
};

export default SendButton;
