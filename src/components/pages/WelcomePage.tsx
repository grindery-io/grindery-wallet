import React from "react";
import Loading from "../shared/Loading/Loading";
import { selectAppStore, useAppSelector } from "../../store";
import { Button, Stack, Typography } from "@mui/material";

const WelcomePage = () => {
  const { error } = useAppSelector(selectAppStore);
  return error && error.type === "auth" && error.code === 401 ? (
    <Stack
      sx={{ margin: "20px", flex: 1 }}
      alignItems="center"
      justifyContent="center"
      spacing="16px"
    >
      <Typography textAlign="center" variant="title">
        🔒
      </Typography>
      <Typography textAlign="center" variant="lg">
        You are not logged in
      </Typography>
      <Typography variant="sm" textAlign="center" color="hint" pb="10px">
        Please visit GrinderyAI Telegram bot to use the Wallet
      </Typography>
      <Button
        color="primary"
        variant="contained"
        onClick={() => {
          if (window.Telegram?.WebApp?.openLink) {
            window.Telegram.WebApp.openLink(
              `https://telegram.me/grinderyAIBot`
            );
          } else {
            window.open(`https://telegram.me/grinderyAIBot`, "_self");
          }
        }}
      >
        Open Telegram
      </Button>
    </Stack>
  ) : (
    <Loading />
  );
};

export default WelcomePage;
