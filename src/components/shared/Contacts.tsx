import React from "react";
import useAppContext from "../../hooks/useAppContext";
import TelegramContacts from "./TelegramContacts";
import { TelegramUserContact } from "../../types/Telegram";
import { Box } from "@mui/material";

const Contacts = ({
  onContactClick,
  selected,
  onSelect,
  placeholder,
  onSelectCancel,
  onSelectConfirm,
}: {
  onContactClick: (contact: TelegramUserContact) => void;
  selected?: TelegramUserContact[];
  onSelect?: (contact: TelegramUserContact) => void;
  placeholder?: React.ReactNode;
  onSelectCancel?: () => void;
  onSelectConfirm?: () => void;
}) => {
  const {
    state: { user },
  } = useAppContext();

  return (
    <Box sx={{ textAlign: "center", width: "100%" }}>
      {!user?.telegramSession ? (
        placeholder || null
      ) : (
        <>
          <TelegramContacts
            onContactClick={onContactClick}
            selected={selected}
            onSelect={onSelect}
            onCancel={onSelectCancel}
            onConfirm={onSelectConfirm}
          />
        </>
      )}
    </Box>
  );
};

export default Contacts;
