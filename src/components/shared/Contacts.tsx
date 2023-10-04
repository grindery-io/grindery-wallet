import React from "react";
import useAppContext from "../../hooks/useAppContext";
import TelegramContacts from "./TelegramContacts";
import { TelegramUserContact } from "../../types/Telegram";

const Contacts = ({
  onContactClick,
  selected,
  onSelect,
  placeholder,
}: {
  onContactClick: (contact: TelegramUserContact) => void;
  selected?: TelegramUserContact[];
  onSelect?: (contact: TelegramUserContact) => void;
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
          <TelegramContacts
            onContactClick={onContactClick}
            selected={selected}
            onSelect={onSelect}
          />
        </>
      )}
    </div>
  );
};

export default Contacts;
