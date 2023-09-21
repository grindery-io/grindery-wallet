import React, { useState } from "react";
import useAppContext from "../../hooks/useAppContext";
import TelegramContacts from "./TelegramContacts";
import Button from "./Button";
import styled from "styled-components";
import { TelegramUserContact } from "../../context/AppContext";

const Wrapper = styled.div`
  width: 100%;
  border-radius: 10px;
  border: 1px solid var(--grindery-solids-light-grey, #d3deec);
  background: var(--grindery-solids-white, #fff);
  display: flex;
  padding: 20px;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  gap: 20px;
  box-sizing: border-box;
  margin-top: 20px;

  & p {
    margin: 0;
    padding: 0;
    opacity: 0.6;
  }
  & button {
    width: 100%;
    font-size: 14px;
    padding: 10px 20px;
  }
  & button > span {
    padding: 0;
    background: transparent;

    & img {
      padding: 0;
      background: transparent;
      border: none;
    }
  }
`;

const Contacts = ({
  onContactClick,
}: {
  onContactClick: (contact: TelegramUserContact) => void;
}) => {
  const {
    state: { user },
  } = useAppContext();
  const [connecting, setConnecting] = useState(false);

  return (
    <div style={{ textAlign: "center", width: "100%" }}>
      {!user?.telegramSession ? (
        <Wrapper>
          <p
            style={{
              textAlign: "left",
              opacity: 0.6,
              lineHeight: "1.5",
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
        </Wrapper>
      ) : (
        <>
          <TelegramContacts onContactClick={onContactClick} />
        </>
      )}
    </div>
  );
};

export default Contacts;
