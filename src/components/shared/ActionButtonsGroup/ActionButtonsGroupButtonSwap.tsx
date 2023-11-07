import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router";
import { selectAppStore, useAppSelector } from "../../../store";
import SyncAltIcon from "@mui/icons-material/SyncAlt";

const ActionButtonsGroupButtonSwap = ({ label }: { label?: string }) => {
  const { user } = useAppSelector(selectAppStore);

  let navigate = useNavigate();
  return (
    <Button
      startIcon={
        <SyncAltIcon sx={{ width: "20px", height: "20px", display: "block" }} />
      }
      variant="contained"
      fullWidth
      disabled={!user?.patchwallet}
      onClick={() => {
        navigate("/swap");
      }}
    >
      {label || "Swap tokens"}
    </Button>
  );
};

export default ActionButtonsGroupButtonSwap;
