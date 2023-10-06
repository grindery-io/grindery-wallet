import React from "react";
import { Button } from "@mui/material";
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
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: "16px",
        flexWrap: "nowrap",
        marginTop: "auto",
        marginBottom: "10px",
      }}
    >
      <div style={{ flex: 1 }}>
        <Button
          variant="outlined"
          color="secondary"
          fullWidth
          onClick={() => {
            navigate(-1);
          }}
          sx={{
            textTransform: "none",
            fontWeight: "normal",
            border: "1px solid var(--tg-theme-button-color, #2481cc)",
            color: "var(--tg-theme-button-color, #2481cc)",
            background: "var(--tg-theme-bg-color, #ffffff)",
            boxShadow: "5px 5px 20px 0px var(--tg-theme-bg-color, #ffffff)",
            "&:hover": {
              border: "1px solid var(--tg-theme-button-color, #2481cc)",
              color: "var(--tg-theme-button-color, #2481cc)",
              background: "var(--tg-theme-bg-color, #ffffff)",
              opacity: 1,
            },
          }}
        >
          Cancel
        </Button>
      </div>
      <div style={{ flex: 1 }}>
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          disabled={status === "sending" || !input.amount || !input.recipient}
          sx={{
            textTransform: "none",
            fontWeight: "normal",
            background: "var(--tg-theme-button-color, #2481cc)",
            color: "var(--tg-theme-button-text-color, #ffffff)",
            boxShadow: "5px 5px 20px 0px var(--tg-theme-bg-color, #ffffff)",
            "&:hover": {
              opacity: "1 !important",
              background: "var(--tg-theme-button-color, #2481cc)",
              color: "var(--tg-theme-button-text-color, #ffffff)",
            },
            "&:disabled": {
              opacity: "0.3 !important",
              background: "var(--tg-theme-button-color, #2481cc)",
              color: "var(--tg-theme-button-text-color, #ffffff)",
            },
          }}
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
          {status === "sending" ? "Sending..." : "Send"}
        </Button>
      </div>
    </div>
  );
};

export default SendButtonsGroup;
