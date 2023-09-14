import React, { useEffect } from "react";
import TelegramAuth from "../shared/TelegramAuth";
import useAppContext from "../../hooks/useAppContext";

type Props = {};

const ConnectTelegram = (props: Props) => {
  const {
    state: { user },
  } = useAppContext();

  return user?.telegramSession ? (
    <p>
      Telegram account connected.
      <br />
      You can close this page and return to the Telegram app.
    </p>
  ) : (
    <TelegramAuth />
  );
};

export default ConnectTelegram;
