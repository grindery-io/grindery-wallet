import React from "react";
import TelegramAuth from "../shared/TelegramAuth";
import useAppContext from "../../hooks/useAppContext";
import styled from "styled-components";

const List = styled.ul`
  margin: 10px 0 0;
  padding: 0;
  text-align: left;

  & li {
    padding: 8px 0;
    margin: 0 0 0 20px;
  }
`;

const ConnectTelegramPage = () => {
  const {
    state: { telegramSessionSaved },
  } = useAppContext();

  return telegramSessionSaved ? (
    <div style={{ padding: "0 16px" }}>
      <p style={{ margin: "50px", textAlign: "center" }}>
        Account Successfully Connected!
      </p>
      <p style={{ textAlign: "center", margin: "0 0 40px" }}>
        You can close this page and return to the{" "}
        <a href="https://telegram.me/grinderyAIBot">Telegram app</a>.
      </p>
      <List>
        <li>Send Crypto: Via contact names, not wallet addresses.</li>
        <li>Invite & Earn: Spot unjoined network members and earn rewards.</li>
        <li>Get Alerts: For new joiners and instantly trade tokens.</li>
        <li>And More: Explore additional features!</li>
      </List>
      <p style={{ opacity: 0.6, fontSize: "14px", margin: "40px 0 20px" }}>
        Your data is securely transmitted, encrypted, and stored. We collect
        data only with your explicit consent and won’t message anyone without
        your approval. You can disconnect Grindery anytime from your Telegram
        client under “devices.”
      </p>
    </div>
  ) : (
    <TelegramAuth />
  );
};

export default ConnectTelegramPage;
