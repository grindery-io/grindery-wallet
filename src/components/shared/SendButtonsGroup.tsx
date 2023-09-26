import React, { useState } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router";
//import axios from "axios";
//import { BOT_API_URL } from "../../constants";
import { TelegramUserContact } from "../../types/Telegram";

const SendButtonsGroup = ({
  input,
}: {
  input: {
    amount: string;
    recipient: TelegramUserContact | null;
  };
}) => {
  let navigate = useNavigate();
  const [sending, setSending] = useState(false);

  /*const sendTokens = async () => {
    setSending(true);
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
    } catch (error) {
      console.log("send tokens error", error);
    }
    setSending(true);
  };*/

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
            navigate("/");
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
          color="primary"
          fullWidth
          disabled={sending || !input.amount || !input.recipient}
          sx={{
            textTransform: "none",
            fontWeight: "normal",
          }}
          onClick={() => {
            alert("Coming soon");
          }}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default SendButtonsGroup;
