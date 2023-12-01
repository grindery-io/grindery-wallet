import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router";
import { selectAppStore, useAppSelector } from "../../../../store";
import SyncAltIcon from "@mui/icons-material/SyncAlt";

const MainButtonsGroupButtonSwap = ({
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
          <SyncAltIcon
            sx={{ width: "20px", height: "20px", display: "block" }}
          />
        ) : undefined
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

export default MainButtonsGroupButtonSwap;
