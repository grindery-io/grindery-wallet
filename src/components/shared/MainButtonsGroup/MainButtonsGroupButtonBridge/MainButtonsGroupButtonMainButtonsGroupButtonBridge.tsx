import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router";
import { selectAppStore, useAppSelector } from "../../../../store";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import SwitchAccessShortcutIcon from "@mui/icons-material/SwitchAccessShortcut";

const MainButtonsGroupButtonBridge = ({ label }: { label?: string }) => {
  const { user } = useAppSelector(selectAppStore);

  let navigate = useNavigate();
  return (
    <Button
      startIcon={
        <SwitchAccessShortcutIcon
          sx={{
            width: "20px",
            height: "20px",
            display: "block",
            transform: "rotate(90deg)",
          }}
        />
      }
      variant="contained"
      fullWidth
      disabled={!user?.patchwallet}
      onClick={() => {
        navigate("/bridge");
      }}
    >
      {label || "Bridge tokens"}
    </Button>
  );
};

export default MainButtonsGroupButtonBridge;
