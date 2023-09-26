import React from "react";
import useAppContext from "../../hooks/useAppContext";
import TelegramContacts from "./TelegramContacts";
import { TelegramUserContact } from "../../types/Telegram";

const Contacts = ({
  onContactClick,
  placeholder,
}: {
  onContactClick: (contact: TelegramUserContact) => void;
  placeholder?: React.ReactNode;
}) => {
  const {
    state: { user },
  } = useAppContext();

  return (
    <div style={{ textAlign: "center", width: "100%" }}>
      {!user?.telegramSession ? (
        placeholder || null
      ) : (
        <>
          <TelegramContacts onContactClick={onContactClick} />
        </>
      )}
    </div>
  );
};

export default Contacts;
