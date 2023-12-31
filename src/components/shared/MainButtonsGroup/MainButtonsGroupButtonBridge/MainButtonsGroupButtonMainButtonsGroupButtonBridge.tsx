import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router";
import { selectAppStore, useAppSelector } from "../../../../store";
import SwitchAccessShortcutIcon from "@mui/icons-material/SwitchAccessShortcut";

const MainButtonsGroupButtonBridge = ({
  label,
  withIcon = true,
}: {
  label?: string;
  withIcon?: boolean;
}) => {
  const { user } = useAppSelector(selectAppStore);

  let navigate = useNavigate();
  return (
    <Button
      startIcon={
        withIcon ? (
          <SwitchAccessShortcutIcon
            sx={{
              width: "20px",
              height: "20px",
              display: "block",
              transform: "rotate(90deg)",
            }}
          />
        ) : undefined
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
