import React from "react";
import { Box, Button } from "@mui/material";
import Title from "../Title";
import Subtitle from "../Subtitle";
import { useNavigate } from "react-router";
import { selectAppStore, useAppSelector } from "store";
import { MAIN_TOKEN_ADDRESS } from "../../../constants";

const SendTokensSentMessage = () => {
  const navigate = useNavigate();
  const {
    send: {
      input: { tokenAddress },
    },
  } = useAppSelector(selectAppStore);
  const withConfirmation =
    tokenAddress?.toLowerCase() !== MAIN_TOKEN_ADDRESS.toLowerCase();
  return (
    <>
      <Box
        sx={{
          margin: "32px auto 24px",
          textAlign: "center",
        }}
      >
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="48" height="48" rx="24" fill="#00B674" />
          <path
            d="M19.8003 33.4251C19.466 33.4253 19.1349 33.3595 18.826 33.2314C18.5171 33.1034 18.2365 32.9157 18.0003 32.6791L12.5583 27.2391C12.2771 26.9578 12.1191 26.5764 12.1191 26.1786C12.1191 25.7809 12.2771 25.3994 12.5583 25.1181C12.8396 24.8369 13.2211 24.679 13.6188 24.679C14.0166 24.679 14.398 24.8369 14.6793 25.1181L19.8003 30.2391L33.3483 16.6911C33.6296 16.4099 34.0111 16.252 34.4088 16.252C34.8066 16.252 35.188 16.4099 35.4693 16.6911C35.7505 16.9724 35.9085 17.3539 35.9085 17.7516C35.9085 18.1494 35.7505 18.5308 35.4693 18.8121L21.6003 32.6791C21.3641 32.9157 21.0835 33.1034 20.7746 33.2314C20.4658 33.3595 20.1347 33.4253 19.8003 33.4251Z"
            fill="white"
          />
        </svg>
      </Box>
      <Title style={{ marginBottom: 0 }}>
        {withConfirmation ? "Confirm transaction" : "Tokens sent"}
      </Title>
      <Subtitle>
        {withConfirmation
          ? "Close the wallet and confirm transaction in the chat."
          : "Tokens have been sent, and you will receive a Telegram notification once the transaction is confirmed on the blockchain."}
      </Subtitle>
      <Box sx={{ textAlign: "center" }}>
        <Button
          variant="outlined"
          onClick={() => {
            if (withConfirmation) {
              if (typeof window.Telegram?.WebApp.close !== "undefined") {
                window.Telegram?.WebApp.close();
              } else {
                window.open(`https://telegram.me/grinderyAIBot`, "_self");
              }
            } else {
              navigate("/");
            }
          }}
        >
          Close
        </Button>
      </Box>
    </>
  );
};

export default SendTokensSentMessage;
