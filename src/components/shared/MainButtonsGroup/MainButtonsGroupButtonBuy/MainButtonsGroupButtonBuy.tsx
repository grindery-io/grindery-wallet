import React from "react";
import { Button } from "@mui/material";
import { selectAppStore, useAppSelector } from "../../../../store";
import AddIcon from "@mui/icons-material/Add";

const url =
  process.env.REACT_APP_ENV === "production"
    ? "https://wallet.grindery.io/buy"
    : "https://wallet-staging.grindery.io/buy";

const MainButtonsGroupButtonBuy = ({
  label,
  withIcon = true,
}: {
  label?: string;
  withIcon?: boolean;
}) => {
  const { user } = useAppSelector(selectAppStore);

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
        if (window.Telegram?.WebApp?.openLink) {
          window.Telegram.WebApp.openLink(
            `${url}?${encodeURIComponent(
              window.Telegram?.WebApp?.initData || ""
            )}`
          );
        } else {
          window.open(
            `${url}?${window.Telegram?.WebApp?.initData || ""}`,
            "_blank"
          );
        }
      }}
    >
      {label || "Buy tokens"}
    </Button>
  );
};

export default MainButtonsGroupButtonBuy;
