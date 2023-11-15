import React, { useState } from "react";
import { Box } from "@mui/material";
import {
  appStoreActions,
  selectAppStore,
  useAppDispatch,
  useAppSelector,
} from "store";
import SearchBox, { Filter } from "../SearchBox/SearchBox";
import ContactsListEmpty from "./ContactsListEmpty";
import ContactsListLoading from "./ContactsListLoading";
import ContactsListItems from "./ContactsListItems";
import { createFilterOption } from "utils";

/**
 * Contacts list props
 */
export type ContactsListProps = {
  /**
   * Contact click handler
   * @param contact - Telegram user contact
   */
  onContactClick: (id: string) => void;
  /**
   * Array of selected contacts ids
   */
  selected?: string[];
  /**
   * Contact select handler
   * @param contact - Telegram user contact
   */
  onSelect?: (contactId: string) => void;
  /**
   * Contacts access denied placholder
   */
  placeholder?: React.ReactNode;
  /**
   * Cancel selection button click handler
   */
  onSelectCancel?: () => void;
  /**
   * Confirm selection button click handler
   */
  onSelectConfirm?: () => void;
};

/**
 * Contacts list component
 * @since 0.3.15
 * @param props - ContactsList props
 * @returns React function component
 */
const ContactsList = (props: ContactsListProps) => {
  const { placeholder } = props;
  const { user, contacts } = useAppSelector(selectAppStore);

  const dispatch = useAppDispatch();
  const { items, loading, filters } = contacts || {};
  const [search, setSearch] = useState("");

  const options: Filter[] = [
    createFilterOption(
      "invited",
      "Invited Contacts",
      "checkbox",
      "invited",
      items || [],
      filters,
      user,
      dispatch,
      appStoreActions
    ),
    createFilterOption(
      "not-invited",
      "Not invited Contacts",
      "checkbox",
      "not-invited",
      items || [],
      filters,
      user,
      dispatch,
      appStoreActions
    ),
    createFilterOption(
      "has-wallet",
      "Contacts with wallets",
      "checkbox",
      "has-wallet",
      items || [],
      filters,
      user,
      dispatch,
      appStoreActions
    ),
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
