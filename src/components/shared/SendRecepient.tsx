import React from "react";
import styled from "styled-components";
import { getSecondaryUserDisplayName } from "../../utils/getSecondaryUserDisplayName";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { TelegramUserContact } from "../../types/Telegram";
import ContactAvatar from "./ContactAvatar";

const Wrapper = styled.div`
  border-radius: 10px;
  border: none;
  background: var(--tg-theme-secondary-bg-color, #efeff3);
  display: flex;
  width: 100%;
  padding: 10px 10px 10px 20px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 16px;
  box-sizing: border-box;
`;

const SendRecepient = ({
  recepient,
  onClear,
}: {
  recepient: TelegramUserContact | TelegramUserContact[];
  onClear: () => void;
}) => {
  const isSingle = !Array.isArray(recepient) || recepient.length === 1;
  const contact = isSingle
    ? Array.isArray(recepient)
      ? recepient[0]
      : recepient
    : null;
  const photo = isSingle
    ? localStorage.getItem("gr_wallet_contact_photo_" + contact?.id)
    : null;
  return (
    <Wrapper>
      {isSingle && (
        <>
          {photo && photo !== "null" ? (
            <img
              src={photo}
              alt=""
              style={{
                width: "36px",
                height: "36px",
                display: "block",
                borderRadius: "50%",
              }}
            />
          ) : (
            <ContactAvatar contact={contact} />
          )}
        </>
      )}

      <div>
        <p
          style={{
            fontSize: "14px",
            margin: 0,
            lineHeight: 1.5,
            color: "var(--tg-theme-text-color, #000000)",
          }}
        >
          Recipient{!isSingle ? "s" : ""}
        </p>
        <p
          style={{
            fontSize: "14px",
            margin: 0,
            lineHeight: 1.5,
            color: "var(--tg-theme-hint-color, #999999)",
          }}
        >
          {isSingle && contact ? (
            <>
              {getSecondaryUserDisplayName(contact)}
              {contact.username ? ` | @${contact.username}` : ""}
            </>
          ) : (
            <>{Array.isArray(recepient) ? recepient.length : 0} contacts</>
          )}
        </p>
      </div>
      <IconButton onClick={onClear} sx={{ marginLeft: "auto" }}>
        <CloseIcon style={{ color: "var(--tg-theme-hint-color, #999999)" }} />
      </IconButton>
    </Wrapper>
  );
};

export default SendRecepient;
