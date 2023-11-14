import React, { useCallback } from "react";
import { Button, Stack } from "@mui/material";
import { useNavigate } from "react-router";
import { SendStatus } from "../../../../types/State";
import { sendTokensRequest } from "../../../../services/send";
import { selectAppStore, useAppSelector } from "../../../../store";

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
  const {
    contacts: { items },
  } = useAppSelector(selectAppStore);

  const recipient = Array.isArray(input.recipient)
    ? input.recipient.map((id) => items?.find((item) => item.id === id))
    : items?.find((item) => item.id === input.recipient);

  const sendTokens = useCallback(async () => {
    if (!/^\d+$/.test(input.amount) || parseInt(input.amount) <= 0) {
      setStatus(SendStatus.ERROR);
      return;
    }
    if (!input.recipient) {
      return;
    }
    if (countFailed > 3) {
      return;
    }
    setStatus(SendStatus.SENDING);
    try {
      const res = await sendTokensRequest(
        input.recipient,
        input.amount,
        input.message,
        Array.isArray(recipient)
          ? recipient?.map((item) => item?.username || "")
          : recipient?.username || "",
        Array.isArray(recipient)
          ? recipient?.map(
              (item) =>
                `${item?.firstName || ""}${
                  item?.lastName ? " " + item?.lastName : ""
                }`
            )
          : recipient?.username || ""
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
  }, [recipient]);

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
          navigate(-1);
        }}
        size="large"
        fullWidth
      >
        Cancel
      </Button>

      <Button
        variant="contained"
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
