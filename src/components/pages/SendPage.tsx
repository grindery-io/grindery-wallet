import React, { useState } from "react";
import Button from "../shared/Button";
import useAppContext from "../../hooks/useAppContext";
import TelegramContacts from "../shared/TelegramContacts";
import useBackButton from "../../hooks/useBackButton";

type Props = {};

const SendPage = (props: Props) => {
  const {
    state: { user },
  } = useAppContext();
  const [connecting, setConnecting] = useState(false);
  useBackButton({ path: "/" });

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "center",
          flexWrap: "nowrap",
          gap: "16px",
        }}
      >
        <h3 style={{ margin: 0 }}>Send</h3>
      </div>

      <div style={{ marginTop: "40px", textAlign: "center" }}>
        {!user?.telegramSession ? (
          <>
            <p>
              Connect your Telegram account to grant Grindery access to your
              contacts list.
            </p>

            <Button
              disabled={connecting}
              onClick={() => {
                setConnecting(true);
                if (window.Telegram?.WebApp?.openLink) {
                  window.Telegram.WebApp.openLink(
                    `https://wallet-staging.grindery.io/connect/telegram?${
                      window.Telegram?.WebApp?.initData || ""
                    }`
                  );
                } else {
                  window.open(
                    `https://wallet-staging.grindery.io/connect/telegram?${
                      window.Telegram?.WebApp?.initData || ""
                    }`
                  );
                }
              }}
              value="Connect Telegram"
            />
          </>
        ) : (
          <TelegramContacts
            onContactClick={(contact) => {
              alert("ID: " + contact.id);
            }}
          />
        )}
      </div>
    </>
  );
};

export default SendPage;
