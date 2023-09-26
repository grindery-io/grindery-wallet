import React, { useState } from "react";
import BottomNavigation from "../shared/BottomNavigation";
import AppHeader from "../shared/AppHeader";
import { useNavigate } from "react-router";
import Contacts from "../shared/Contacts";
import Button from "../shared/Button";

const ContactsPage = () => {
  const navigate = useNavigate();
  const [connecting, setConnecting] = useState(false);

  return (
    <>
      <AppHeader />

      <Contacts
        onContactClick={(contact) => {
          navigate(`/contacts/${contact.id}`);
        }}
        placeholder={
          <div style={{ padding: "0 16px" }}>
            <p
              style={{
                textAlign: "center",
                fontSize: "1.5em",
                lineHeight: "1.5",
              }}
            >
              Your crypto wallet with social super powers!
            </p>

            <Button
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
                Explore your crypto network
              </li>
              <li style={{ margin: "0 0 0 20px", padding: "8px 0" }}>
                and more to come…
              </li>
            </ul>
          </div>
        }
      />

      <BottomNavigation />
    </>
  );
};

export default ContactsPage;
