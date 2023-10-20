import React from "react";
import { Button, Stack } from "@mui/material";
import { useNavigate } from "react-router";
import axios from "axios";
import { BOT_API_URL } from "../../../../constants";
import { SendStatus } from "../../../../types/State";

const SendTokensInputButtons = ({
  input,
  status,
  setStatus,
}: {
  input: {
    amount: string;
    recipient: string | string[] | null;
    message: string;
  };
  status: string;
  setStatus: (status: SendStatus) => void;
}) => {
  let navigate = useNavigate();
  const [countFailed, setCountFailed] = React.useState(0);
  const sendTokens = async () => {
    if (!/^\d+$/.test(input.amount) || parseInt(input.amount) <= 0) {
      setStatus(SendStatus.ERROR);
      return;
    }
    if (countFailed > 3) {
      return;
    }
    setStatus(SendStatus.SENDING);
    try {
      const res = await axios.post(
        `${BOT_API_URL}/v2/send`,
        {
          recipientTgId: input.recipient,
          amount: input.amount,
          message: input.message || undefined,
        },
        {
          headers: {
            Authorization: "Bearer " + window.Telegram?.WebApp?.initData,
          },
        }
      );
      if (res.data?.success) {
        setStatus(SendStatus.SENT);
      } else {
        setStatus(SendStatus.ERROR);
      }
    } catch (error) {
      console.error("send tokens error", error);
      setCountFailed(countFailed + 1);
      setStatus(SendStatus.ERROR);
    }
  };

  return (
    <Stack
      direction="row"
      spacing="16px"
      mt="auto"
      mb="10px"
      bgcolor="var(--tg-theme-bg-color, #ffffff)"
    >
      <Button
        variant="outlined"
        onClick={() => {
          setTimeout(() => {
            navigate(-1);
          }, 150);
        }}
        size="large"
        fullWidth
      >
        Cancel
      </Button>

      <Button
        fullWidth
        disabled={
          status === "sending" ||
          !input.amount ||
          !input.recipient ||
          countFailed > 3
        }
        size="large"
        onClick={() => {
          if (window.Telegram?.WebApp?.showConfirm) {
            window.Telegram?.WebApp?.showConfirm(
              "You are going to send " +
                (Array.isArray(input.recipient)
                  ? (
                      parseFloat(input.amount) * input.recipient.length
                    ).toString()
                  : input.amount) +
                " G1 tokens. This action can not be undone. Are you sure?",
              (confirmed: boolean) => {
                if (confirmed) {
                  sendTokens();
                }
              }
            );
          } else {
            const confirmed = window.confirm(
              "You are going to send " +
                (Array.isArray(input.recipient)
                  ? (
                      parseFloat(input.amount) * input.recipient.length
                    ).toString()
                  : input.amount) +
                " G1 tokens. This action can not be undone. Are you sure?"
            );
            if (confirmed) {
              sendTokens();
            }
          }
        }}
      >
        {countFailed > 3
          ? "Try later..."
          : status === "sending"
          ? "Sending..."
          : "Send"}
      </Button>
    </Stack>
  );
};

export default SendTokensInputButtons;
