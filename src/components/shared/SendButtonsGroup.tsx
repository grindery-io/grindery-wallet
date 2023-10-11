import React from "react";
import { Button, Stack } from "@mui/material";
import { useNavigate } from "react-router";
import { TelegramUserContact } from "../../types/Telegram";
import axios from "axios";
import { BOT_API_URL } from "../../constants";

const SendButtonsGroup = ({
  input,
  status,
  setStatus,
}: {
  input: {
    amount: string;
    recipient: TelegramUserContact | TelegramUserContact[] | null;
    message: string;
  };
  status: string;
  setStatus: (status: string) => void;
}) => {
  let navigate = useNavigate();

  const sendTokens = async () => {
    setStatus("sending");
    try {
      const res = await axios.post(
        `${BOT_API_URL}/v1/telegram/send`,
        {
          recipientTgId: Array.isArray(input.recipient)
            ? input.recipient.map((contact) => contact.id)
            : input.recipient?.id,
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
        setStatus("sent");
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("send tokens error", error);
      setStatus("error");
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
        disabled={status === "sending" || !input.amount || !input.recipient}
        size="large"
        onClick={() => {
          setTimeout(() => {
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
          }, 250);
        }}
      >
        {status === "sending" ? "Sending..." : "Send"}
      </Button>
    </Stack>
  );
};

export default SendButtonsGroup;
