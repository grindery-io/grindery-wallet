import React, { useCallback } from "react";
import useTelegramContext from "../../hooks/useTelegramContext";
import TelegramContacts from "./TelegramContacts";
import TelegramAuth from "./TelegramAuth";
import axios from "axios";

type Props = {
  setRecepient: (a: string) => void;
  setRecepientSelected: (a: boolean) => void;
};

const Contacts = ({ setRecepient, setRecepientSelected }: Props) => {
  const { state } = useTelegramContext();
  const {
    user: { telegram_session },
  } = state;
  const onContactClick = useCallback(
    async (contact: any) => {
      setRecepient(contact.id);
      setRecepientSelected(true);
    },
    [setRecepient]
  );

  return telegram_session ? (
    <TelegramContacts onContactClick={onContactClick} />
  ) : (
    <TelegramAuth />
  );
};

export default Contacts;
