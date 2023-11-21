import React, { useState } from "react";
import { selectAppStore, useAppSelector } from "store";
import { Box, Typography } from "@mui/material";
import Loading from "../Loading/Loading";
import ContactsListHeader from "./ContactsListHeader/ContactsListHeader";
import ContactsListBatchSelectButtons from "./ContactsListBatchSelectButtons/ContactsListBatchSelectButtons";
import ContactsListItems from "./ContactsListItems/ContactsListItems";
import {
  filterContactsData,
  filterContactsListDataBySearchQuery,
  getContactsListData,
} from "utils";

/**
 * Contact click handler
 * @param {string} id - Telegram contact or user id
 */
export type ContactsListOnContactClickType = (id: string) => void;

/**
 * Contact select handler
 * @param id - Telegram contact or user id
 */
export type ContactsListOnSelectType = (id: string) => void;

/**
 * Array of selected contacts ids
 */
export type ContactsListSelectedType = string[];

/**
 * Cancel selection button click handler
 */
export type ContactsListOnSelectCancelType = () => void;

/**
 * Confirm selection button click handler
 */
export type ContactsListOnSelectConfirmType = () => void;

/**
 * List height
 */
export type ContactsListHeightType = number;

export type ContactsListProps = {
  onContactClick: ContactsListOnContactClickType;
  selected?: ContactsListSelectedType;
  onSelect?: ContactsListOnSelectType;
  onSelectCancel?: ContactsListOnSelectCancelType;
  onSelectConfirm?: ContactsListOnSelectConfirmType;
  height?: ContactsListHeightType;
};

const ContactsList = (props: ContactsListProps) => {
  const [search, setSearch] = useState("");
  const {
    user,
    contacts,
    debug: { enabled, features },
  } = useAppSelector(selectAppStore);

  const { items, loading, filters, social, socialLoading } = contacts || {},
    hasTgSession = Boolean(user?.telegramSession),
    contactsItems = items || [],
    socialContactsItems = social || [],
    socialContactsEnabled = Boolean(enabled && features?.SOCIAL_CONTACTS),
    contactsLoading = Boolean(loading),
    socialContactsLoading = Boolean(socialLoading);

  const rawData = getContactsListData({
    hasTgSession,
    contactsItems,
    socialContactsItems,
    socialContactsEnabled,
    contactsLoading,
    socialContactsLoading,
  })
    .filter((item: any) => filterContactsListDataBySearchQuery(item, search))
    .filter((item: any) => item.props.id !== user?.userTelegramID)
    .filter((item: any) => item.props.userTelegramID !== user?.userTelegramID);

  const data = rawData.filter((item: any) =>
    (filters || []).length > 0 ? filterContactsData(item, filters) : true
  );

  return (
    <Box sx={{ width: "100%", maxWidth: "768px", margin: "0 auto" }}>
      <Box textAlign="left">
        <ContactsListHeader
          rawData={rawData}
          value={search}
          onChange={(value) => {
            setSearch(value);
          }}
        />

        {data && data.length > 0 ? (
          <>
            <ContactsListItems {...props} data={data} />
            <ContactsListBatchSelectButtons {...props} />
          </>
        ) : loading || socialLoading ? (
          <Loading />
        ) : (
          <Typography sx={{ margin: "20px", textAlign: "center" }}>
            Nothing found
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default ContactsList;
