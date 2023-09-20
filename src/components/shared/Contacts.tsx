import React, { useState } from "react";
import useAppContext from "../../hooks/useAppContext";
import TelegramContacts from "./TelegramContacts";
import Button from "./Button";
import { Typography } from "@mui/material";

type Props = {};

const Contacts = (props: Props) => {
  const {
    state: { user },
  } = useAppContext();
  const [connecting, setConnecting] = useState(false);

  return (
    <div style={{ textAlign: "center", width: "100%" }}>
      {!user?.telegramSession ? (
        <>
          <p
            style={{
              maxWidth: "320px",
              margin: "0 auto 16px",
              textAlign: "center",
            }}
          >
            Connect your Telegram account to grant Grindery access to your
            contacts list.
          </p>

          <Button
            variant="outlined"
            color="secondary"
            size="small"
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
        <>
          <Typography
            variant="h6"
            sx={{
              margin: "0 0 8px",
              padding: "0 0 2px",
              textAlign: "left",
              position: "sticky",
              top: "0px",
              background: "#fff",
              zIndex: 1,
            }}
          >
            Contacts
          </Typography>
          <TelegramContacts
            onContactClick={(contact) => {
              alert("ID: " + contact.id);
            }}
          />
        </>
      )}
    </div>
  );
};

export default Contacts;
