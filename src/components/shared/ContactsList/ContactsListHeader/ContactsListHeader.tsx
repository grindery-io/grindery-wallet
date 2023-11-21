import React from "react";
import SearchBox, { Filter } from "../../SearchBox/SearchBox";
import {
  appStoreActions,
  selectAppStore,
  useAppDispatch,
  useAppSelector,
} from "store";

export type ContactsListHeaderProps = {
  value: string;
  onChange: (value: string) => void;
  rawData: any[];
  applyFilters: (item: any, filters?: string[]) => boolean;
};

const ContactsListHeader = ({
  value,
  onChange,
  rawData,
  applyFilters,
}: ContactsListHeaderProps) => {
  const dispatch = useAppDispatch();
  const {
    user,
    contacts,
    debug: { enabled, features },
  } = useAppSelector(selectAppStore);

  const { filters } = contacts || {};

  const filterOptions = [
    ...(user?.telegramSession && enabled && features?.SOCIAL_CONTACTS
      ? [
          {
            key: "telegram",
            label: "Telegram contacts",
          },
        ]
      : []),
    ...(user?.telegramSession
      ? [
          {
            key: "invited",
            label: "Invited Contacts",
          },
          {
            key: "not-invited",
            label: "Not invited Contacts",
          },
          {
            key: "has-wallet",
            label: "Contacts with wallets",
          },
        ]
      : []),
    ...(enabled && features?.SOCIAL_CONTACTS && !user?.telegramSession
      ? [
          {
            key: "interacted",
            label: "People you've interacted with",
          },
        ]
      : []),
    ...(enabled && features?.SOCIAL_CONTACTS
      ? [
          {
            key: "might-know",
            label: "People you might know",
          },
        ]
      : []),
  ];

  const options: Filter[] = filterOptions
    .filter((option) => true)
    .map((option) => ({
      ...option,
      type: "checkbox",
      value: filters?.includes(option.key) || false,
      isActive: filters?.includes(option.key) || false,
      count: rawData
        .filter((item: any) =>
          applyFilters(item, [...(filters || []), option.key])
        )
        .filter(
          (item) =>
            item.type !== "banner" &&
            item.type !== "header" &&
            item.type !== "placeholder"
        ).length,
      onChange: (value: string | number | boolean) => {
        dispatch(
          appStoreActions.setContacts({
            filters: value
              ? [...(filters || []), option.key]
              : filters?.filter((item) => item !== option.key),
          })
        );
      },
    }));

  return (
    <SearchBox
      placeholder="Contacts"
      value={value}
      onChange={onChange}
      filters={options}
    />
  );
};

export default ContactsListHeader;
