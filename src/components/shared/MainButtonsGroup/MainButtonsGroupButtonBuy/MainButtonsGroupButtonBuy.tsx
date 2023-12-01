import React from "react";
import { Button } from "@mui/material";
import { selectAppStore, useAppSelector } from "../../../../store";
import SwitchAccessShortcutIcon from "@mui/icons-material/SwitchAccessShortcut";
import { useNavigate } from "react-router";

const MainButtonsGroupButtonBuy = ({
  label,
  withIcon = true,
}: {
  label?: string;
  withIcon?: boolean;
}) => {
  const { user } = useAppSelector(selectAppStore);
  const navigate = useNavigate();

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
      onClick={async () => {
        navigate("/buy");
      }}
    >
      {label || "Buy tokens"}
    </Button>
  );
};

export default MainButtonsGroupButtonBuy;
