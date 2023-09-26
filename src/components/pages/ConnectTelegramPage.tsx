import React from "react";
import TelegramAuth from "../shared/TelegramAuth";
import useAppContext from "../../hooks/useAppContext";

const ConnectTelegramPage = () => {
  const {
    state: { telegramSessionSaved },
  } = useAppContext();

  return telegramSessionSaved ? (
    <p style={{ margin: "50px", textAlign: "center" }}>
      Telegram account connected.
      <br />
      <br />
      You can close this page and return to the{" "}
      <a href="https://telegram.me/grinderyAIBot">Telegram app</a>.
    </p>
  ) : (
    <TelegramAuth />
  );
};

export default ConnectTelegramPage;
