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
    if (Array.isArray(input.recipient)) {
      setStatus("error");
      return;
    }
    try {
      const res = await axios.post(
        `${BOT_API_URL}/v1/telegram/send`,
        {
          recipientTgId: input.recipient?.id,
          amount: input.amount,
        },
        {
          headers: {
            Authorization: "Bearer " + window.Telegram?.WebApp?.initData,
          },
        }
      );
      console.log("send tokens res", res);
      if (res.data?.success) {
        setStatus("sent");
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.log("send tokens error", error);
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
          }}
          onClick={() => {
            if (window.Telegram?.WebApp?.showConfirm) {
              window.Telegram?.WebApp?.showConfirm(
                "You are going to send " +
                  input.amount +
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
                  input.amount +
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
