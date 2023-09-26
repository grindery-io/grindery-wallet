import React, { useState } from "react";
import useBackButton from "../../hooks/useBackButton";
import { Button } from "@mui/material";
import { default as CustomButton } from "../shared/Button";
import { useNavigate, useParams } from "react-router";
import AppHeader from "../shared/AppHeader";
import Contacts from "../shared/Contacts";
import SelectedContact from "../shared/SelectedContact";
import SelectToken from "../shared/SelectToken";
import useAppContext from "../../hooks/useAppContext";
import SendButtonsGroup from "../shared/SendButtonsGroup";
import SendAmount from "../shared/SendAmount";
import { TelegramUserContact } from "../../types/Telegram";

const SendPage = () => {
  const {
    state: { contacts },
  } = useAppContext();
  const [connecting, setConnecting] = useState(false);

  const { id: recipient } = useParams();
  let navigate = useNavigate();
  useBackButton({ path: "/" });
  const [input, setInput] = useState<{
    amount: string;
    recipient: TelegramUserContact | null;
  }>({
    amount: "",
    recipient: recipient
      ? contacts?.find((contact) => contact.id === recipient) || null
      : null,
  });

  return (
    <>
      <AppHeader />

      <div
        style={{
          width: "100%",
          paddingTop: "16px",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          justifyContent: "flex-start",
          gap: "0px",
          flexWrap: "nowrap",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            padding: "0 16px",
            boxSizing: "border-box",
          }}
        >
          <p style={{ margin: 0, textAlign: "center" }}>
            Send{!input.recipient ? " to" : ""}
          </p>
          <Button
            variant="text"
            color="primary"
            onClick={() => {
              navigate("/");
            }}
            sx={{
              color: "#8C30F5",
              margin: 0,
              padding: 0,
              position: "absolute",
              right: "16px",
              top: "-1px",
              textTransform: "none",
              fontWeight: "normal",
              fontSize: "14px",
            }}
          >
            Cancel
          </Button>
        </div>
        {!input.recipient ? (
          <Contacts
            onContactClick={(contact) => {
              navigate(`/send/${contact.id}`);
              setInput({
                ...input,
                recipient: contact,
              });
            }}
            placeholder={
              <div style={{ padding: "0 16px" }}>
                <p
                  style={{
                    textAlign: "center",
                    lineHeight: "1.5",
                  }}
                >
                  To select a recipient your wallet needs access to your
                  contacts.
                </p>

                <CustomButton
                  variant="contained"
                  color="secondary"
                  size="small"
                  fullWidth
                  sx={{ width: "100%" }}
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
                  value="Grant Access"
                />
                <ul style={{ margin: "24px 0", padding: 0, textAlign: "left" }}>
                  <li style={{ margin: "0 0 0 20px", padding: "8px 0" }}>
                    Forget about wallet addresses of your contacts
                  </li>
                  <li style={{ margin: "0 0 0 20px", padding: "8px 0" }}>
                    Send tokens before they setup they own wallet
                  </li>
                  <li style={{ margin: "0 0 0 20px", padding: "8px 0" }}>
                    Earn rewards by identifying contacts to refer
                  </li>
                  <li style={{ margin: "0 0 0 20px", padding: "8px 0" }}>
                    and more to come…
                  </li>
                </ul>
              </div>
            }
          />
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "stretch",
              justifyContent: "flex-start",
              gap: "20px",
              flexWrap: "nowrap",
              flex: 1,
              marginTop: "16px",
              padding: "0 16px",
            }}
          >
            {input.recipient && (
              <SelectedContact
                contact={input.recipient}
                onClear={() => {
                  setInput({
                    ...input,
                    recipient: null,
                  });
                }}
              />
            )}
            <SelectToken />
            <SendAmount
              amount={input.amount}
              onChange={(value) => {
                setInput({
                  ...input,
                  amount: value,
                });
              }}
            />
            <SendButtonsGroup input={input} />
          </div>
        )}
      </div>
    </>
  );
};

export default SendPage;
