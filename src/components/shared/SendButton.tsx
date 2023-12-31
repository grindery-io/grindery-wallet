import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router";
import { ICONS } from "../../constants";
import { selectAppStore, useAppSelector } from "../../store";

const SendButton = () => {
  const { user } = useAppSelector(selectAppStore);

  let navigate = useNavigate();
  return (
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
        navigate("/send");
      }}
    >
      Send tokens
    </Button>
  );
};

export default SendButton;
