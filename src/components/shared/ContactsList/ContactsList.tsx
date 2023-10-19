import React, { useState } from "react";
import { TelegramUserContact } from "../../../types/Telegram";
import { Box } from "@mui/material";
import {
  appStoreActions,
  selectAppStore,
  useAppDispatch,
  useAppSelector,
} from "../../../store";
import SearchBox, { Filter } from "../SearchBox";
import ContactsListEmpty from "./ContactsListEmpty";
import ContactsListLoading from "./ContactsListLoading";
import ContactsListItems from "./ContactsListItems";

export type ContactsListProps = {
  onContactClick: (contact: TelegramUserContact) => void;
  selected?: TelegramUserContact[];
  onSelect?: (contact: TelegramUserContact) => void;
  placeholder?: React.ReactNode;
  onSelectCancel?: () => void;
  onSelectConfirm?: () => void;
};

const ContactsList = (props: ContactsListProps) => {
  const { placeholder } = props;
  const { user, contacts } = useAppSelector(selectAppStore);

  const dispatch = useAppDispatch();
  const { items, loading, filters } = contacts || {};
  const [search, setSearch] = useState("");

  const options: Filter[] = [
    {
      key: "invited",
      label: "Invited Contacts",
      value: (filters || []).includes("invited"),
      type: "checkbox",
      isActive: (filters || []).includes("invited"),
      onChange: (value) => {
        dispatch(
          appStoreActions.setContacts({
            filters: value
              ? [...(filters || []), "invited"]
              : (filters || []).filter((filter) => filter !== "invited"),
          })
        );
      },
      count: items
        ?.filter((contact) => contact.id !== user?.userTelegramID)
        .filter((contact) => contact.isInvited && !contact.isGrinderyUser)
        .length,
    },
    {
      key: "not-invited",
      label: "Not invited Contacts",
      value: (filters || []).includes("not-invited"),
      type: "checkbox",
      isActive: (filters || []).includes("not-invited"),
      onChange: (value) => {
        dispatch(
          appStoreActions.setContacts({
            filters: value
              ? [...(filters || []), "not-invited"]
              : (filters || []).filter((filter) => filter !== "not-invited"),
          })
        );
      },
      count: items
        ?.filter((contact) => contact.id !== user?.userTelegramID)
        .filter((contact) => !contact.isInvited && !contact.isGrinderyUser)
        .length,
    },
    {
      key: "has-wallet",
      label: "Contacts with wallets",
      value: (filters || []).includes("has-wallet"),
      type: "checkbox",
      isActive: (filters || []).includes("has-wallet"),
      onChange: (value) => {
        dispatch(
          appStoreActions.setContacts({
            filters: value
              ? [...(filters || []), "has-wallet"]
              : (filters || []).filter((filter) => filter !== "has-wallet"),
          })
        );
      },
      count: items
        ?.filter((contact) => contact.id !== user?.userTelegramID)
        .filter((contact) => contact.isGrinderyUser).length,
    },
  ];

  return (
    <Box sx={ContactsListStyles}>
      {!user?.telegramSession ? (
        placeholder || null
      ) : (
        <Box textAlign="left">
          <SearchBox
            placeholder="Contacts"
            value={search}
            onChange={(e: string) => {
              setSearch(e);
            }}
            filters={options}
          />

          {items && items.length > 0 ? (
            <ContactsListItems {...props} search={search} />
          ) : loading ? (
            <ContactsListLoading {...props} />
          ) : (
            <ContactsListEmpty {...props} />
          )}
        </Box>
      )}
    </Box>
  );
};

const ContactsListStyles = { textAlign: "center", width: "100%" };

export default ContactsList;
