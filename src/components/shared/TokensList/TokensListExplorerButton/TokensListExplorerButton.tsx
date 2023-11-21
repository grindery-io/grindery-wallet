import React from "react";
import { Box, Button } from "@mui/material";
import { selectAppStore, useAppSelector } from "store";

const TokensListExplorerButton = () => {
  const { user } = useAppSelector(selectAppStore);
  return (
    <Box sx={{ textAlign: "center" }} data-testid="tokens-explorer-button">
      <Button
        size="small"
        variant="text"
        color="primary"
        onClick={() => {
          if (window.Telegram?.WebApp?.openLink) {
            window.Telegram.WebApp.openLink(
              `https://polygonscan.com/tokenholdings?a=${user?.patchwallet}`
            );
          } else {
            window.open(
              `https://polygonscan.com/tokenholdings?a=${user?.patchwallet}`,
              "_blank"
            );
          }
        }}
        sx={{ padding: "4px 16px" }}
      >
        See on Explorer
      </Button>
    </Box>
  );
};

export default TokensListExplorerButton;
