import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import Button from "../shared/Button";
import useAppContext from "../../hooks/useAppContext";
import TelegramContacts from "../shared/TelegramContacts";

type Props = {};

const SendPage = (props: Props) => {
  const {
    state: { user },
  } = useAppContext();
  const navigate = useNavigate();

  const renderCancelButton = (hidden = false) => (
    <div
      style={{
        opacity: hidden ? 0 : 1,
        visibility: hidden ? "hidden" : "visible",
      }}
    >
      <Button
        variant="outlined"
        size="small"
        onClick={
          hidden
            ? undefined
            : () => {
                navigate("/");
              }
        }
        value="Cancel"
      />
    </div>
  );

  useEffect(() => {
    const callback = () => {
      navigate("/");
    };
    if (window.Telegram?.WebApp?.BackButton) {
      window.Telegram.WebApp.BackButton.show();
      window.Telegram.WebApp.BackButton.onClick(callback);
    }

    return () => {
      if (window.Telegram?.WebApp?.BackButton) {
        window.Telegram.WebApp.BackButton.hide();
        window.Telegram.WebApp.BackButton.offClick(callback);
      }
    };
  }, [navigate]);

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
              onClick={() => {
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
