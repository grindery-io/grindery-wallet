import React from "react";
import { Button } from "@mui/material";
import { selectAppStore, useAppSelector } from "../../../../store";
import { useNavigate } from "react-router";
import AddIcon from "@mui/icons-material/Add";

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
          <AddIcon
            sx={{
              width: "20px",
              height: "20px",
              display: "block",
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
