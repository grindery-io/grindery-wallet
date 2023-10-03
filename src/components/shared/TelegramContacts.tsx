import React, { useState } from "react";
import useAppContext from "../../hooks/useAppContext";
import { Box, CircularProgress } from "@mui/material";
import TelegramContact from "./TelegramContact";
import { FixedSizeList as List } from "react-window";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { TelegramUserContact } from "../../types/Telegram";
import SearchBox, { Filter } from "./SearchBox";

type Props = {
  onContactClick: (contact: any) => void;
};

const TelegramContacts = ({ onContactClick }: Props) => {
  const { height } = useWindowDimensions();
  const {
    state: { user, contacts, contactsLoading },
  } = useAppContext();
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<string[]>([]);

  const applyFilters = (contact: TelegramUserContact) => {
    let res = false;
    if (
      filters.includes("invited") &&
      contact.isInvited &&
      !contact.isGrinderyUser
    ) {
      res = true;
    }
    if (filters.includes("has-wallet") && contact.isGrinderyUser) {
      res = true;
    }
    if (
      filters.includes("not-invited") &&
      !contact.isGrinderyUser &&
      !contact.isInvited
    ) {
      res = true;
    }

    return res;
  };

  const data = contacts
    ?.filter(
      (contact: any) =>
        !search ||
        (contact.username &&
          contact.username.toLowerCase().includes(search.toLowerCase())) ||
        (contact.firstName &&
          contact.firstName.toLowerCase().includes(search.toLowerCase())) ||
        (contact.lastName &&
          contact.lastName.toLowerCase().includes(search.toLowerCase()))
    )
    .sort((a: TelegramUserContact, b: TelegramUserContact) =>
      a.isInvited === b.isInvited ? 0 : a.isInvited ? -1 : 1
    )
    .sort((a: TelegramUserContact, b: TelegramUserContact) =>
      a.isGrinderyUser === b.isGrinderyUser ? 0 : a.isGrinderyUser ? -1 : 1
    )
    .filter((contact) => contact.id !== user?.userTelegramID)
    .filter((contact) => (filters.length > 0 ? applyFilters(contact) : true));

  const options: Filter[] = [
    {
      key: "invited",
      label: "Invited Contacts",
      value: filters.includes("invited"),
      type: "checkbox",
      isActive: filters.includes("invited"),
      onChange: (value) => {
        setFilters((filters) => {
          if (value) {
            return [...filters, "invited"];
          } else {
            return filters.filter((filter) => filter !== "invited");
          }
        });
      },
      count: contacts
        ?.filter((contact) => contact.id !== user?.userTelegramID)
        .filter((contact) => contact.isInvited && !contact.isGrinderyUser)
        .length,
    },
    {
      key: "not-invited",
      label: "Not invited Contacts",
      value: filters.includes("not-invited"),
      type: "checkbox",
      isActive: filters.includes("not-invited"),
      onChange: (value) => {
        setFilters((filters) => {
          if (value) {
            return [...filters, "not-invited"];
          } else {
            return filters.filter((filter) => filter !== "not-invited");
          }
        });
      },
      count: contacts
        ?.filter((contact) => contact.id !== user?.userTelegramID)
        .filter((contact) => !contact.isInvited && !contact.isGrinderyUser)
        .length,
    },
    {
      key: "has-wallet",
      label: "Contacts with wallets",
      value: filters.includes("has-wallet"),
      type: "checkbox",
      isActive: filters.includes("has-wallet"),
      onChange: (value) => {
        setFilters((filters) => {
          if (value) {
            return [...filters, "has-wallet"];
          } else {
            return filters.filter((filter) => filter !== "has-wallet");
          }
        });
      },
      count: contacts
        ?.filter((contact) => contact.id !== user?.userTelegramID)
        .filter((contact) => contact.isGrinderyUser).length,
    },
  ];

  const ItemRenderer = ({
    data,
    index,
    style,
  }: {
    data: any;
    index: number;
    style: any;
  }) => {
    return (
      <div style={style}>
        <TelegramContact
          key={data[index].id}
          contact={data[index]}
          onContactClick={onContactClick}
        />
      </div>
    );
  };

  return (
    <div style={{ textAlign: "left" }}>
      <SearchBox
        placeholder="Contacts"
        value={search}
        onChange={(e: string) => {
          setSearch(e);
        }}
        filters={options}
      />

      {contacts && contacts.length > 0 ? (
        <>
          <Box
            sx={{
              "& > div": {
                padding: "0 0 10px",
                boxSizing: "border-box",
                "& > div": {
                  padding: "0 0 10px",
                  boxSizing: "border-box",
                },
              },
            }}
          >
            <List
              height={height - 176}
              itemCount={data?.length}
              itemSize={68}
              width="100%"
              itemData={data}
            >
              {ItemRenderer}
            </List>
          </Box>
        </>
      ) : contactsLoading ? (
        <div style={{ margin: "50px", textAlign: "center" }}>
          <CircularProgress />
        </div>
      ) : (
        <p style={{ margin: "20px" }}>Your contacts list is empty.</p>
      )}
    </div>
  );
};

export default TelegramContacts;
