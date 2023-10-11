import React, { useState } from "react";
import useAppContext from "../../hooks/useAppContext";
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import TelegramContact from "./TelegramContact";
import { FixedSizeList as List } from "react-window";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { TelegramUserContact } from "../../types/Telegram";
import SearchBox, { Filter } from "./SearchBox";

type Props = {
  onContactClick: (contact: TelegramUserContact) => void;
  selected?: TelegramUserContact[];
  onSelect?: (contact: TelegramUserContact) => void;
  onCancel?: () => void;
  onConfirm?: () => void;
};

const TelegramContacts = ({
  onCancel,
  onContactClick,
  selected,
  onSelect,
  onConfirm,
}: Props) => {
  const { height } = useWindowDimensions();
  const {
    state: { user, contacts, contactsLoading, contactsFilters },
    setState,
  } = useAppContext();
  const [search, setSearch] = useState("");

  const applyFilters = (contact: TelegramUserContact) => {
    let res = false;
    if (
      contactsFilters.includes("invited") &&
      contact.isInvited &&
      !contact.isGrinderyUser
    ) {
      res = true;
    }
    if (contactsFilters.includes("has-wallet") && contact.isGrinderyUser) {
      res = true;
    }
    if (
      contactsFilters.includes("not-invited") &&
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
    .filter((contact) =>
      contactsFilters.length > 0 ? applyFilters(contact) : true
    );

  const options: Filter[] = [
    {
      key: "invited",
      label: "Invited Contacts",
      value: contactsFilters.includes("invited"),
      type: "checkbox",
      isActive: contactsFilters.includes("invited"),
      onChange: (value) => {
        setState({
          contactsFilters: value
            ? [...contactsFilters, "invited"]
            : contactsFilters.filter((filter) => filter !== "invited"),
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
      value: contactsFilters.includes("not-invited"),
      type: "checkbox",
      isActive: contactsFilters.includes("not-invited"),
      onChange: (value) => {
        setState({
          contactsFilters: value
            ? [...contactsFilters, "not-invited"]
            : contactsFilters.filter((filter) => filter !== "not-invited"),
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
      value: contactsFilters.includes("has-wallet"),
      type: "checkbox",
      isActive: contactsFilters.includes("has-wallet"),
      onChange: (value) => {
        setState({
          contactsFilters: value
            ? [...contactsFilters, "has-wallet"]
            : contactsFilters.filter((filter) => filter !== "has-wallet"),
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
      <Box sx={style} key={data[index].id}>
        <TelegramContact
          contact={data[index]}
          selected={selected
            ?.map((contact) => contact.id)
            .includes(data[index].id)}
          onContactClick={
            Boolean(selected && selected.length > 0) &&
            typeof onSelect !== "undefined"
              ? onSelect
              : onContactClick
          }
          onContactPress={onSelect}
        />
      </Box>
    );
  };

  return (
    <Box sx={{ textAlign: "left" }}>
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
                padding: `0 0 ${
                  typeof onSelect !== "undefined" &&
                  selected &&
                  selected.length > 0
                    ? "80"
                    : "10"
                }px`,
                boxSizing: "border-box",
                "& > div": {
                  padding: "0 0 10px",
                  boxSizing: "border-box",
                },
              },
            }}
          >
            <List
              height={height - (typeof onSelect !== "undefined" ? 100 : 120)}
              itemCount={data?.length}
              itemSize={68}
              width="100%"
              itemData={data}
            >
              {ItemRenderer}
            </List>
          </Box>
          {typeof onSelect !== "undefined" &&
            selected &&
            selected.length > 0 && (
              <Stack
                direction="row"
                spacing="8px"
                sx={{
                  position: "fixed",
                  bottom: "0px",
                  padding: "0px 8px 16px",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  maxWidth: "768px",
                  zIndex: 2,
                }}
              >
                <Button
                  onClick={
                    onCancel
                      ? () => {
                          setTimeout(() => {
                            onCancel();
                          }, 150);
                        }
                      : undefined
                  }
                  variant="outlined"
                  size="large"
                  sx={{
                    paddingLeft: "48px",
                    paddingRight: "48px",
                    backgroundColor: "var(--tg-theme-bg-color, #ffffff)",
                    "&:hover": {
                      backgroundColor: "var(--tg-theme-bg-color, #ffffff)",
                    },
                    boxShadow:
                      "5px 5px 20px 0px var(--gr-theme-button-shadow-color)",
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={
                    onConfirm
                      ? () => {
                          setTimeout(() => {
                            onConfirm();
                          }, 150);
                        }
                      : undefined
                  }
                  fullWidth
                  size="large"
                  sx={{
                    boxShadow:
                      "5px 5px 20px 0px var(--gr-theme-button-shadow-color)",
                  }}
                >
                  Send x {selected.length} contact
                  {selected.length > 1 ? "s" : ""}
                </Button>
              </Stack>
            )}
        </>
      ) : contactsLoading ? (
        <Box sx={{ margin: "50px", textAlign: "center" }}>
          <CircularProgress
            sx={{ color: "var(--tg-theme-button-color, #2481cc)" }}
          />
        </Box>
      ) : (
        <Typography sx={{ margin: "20px" }}>
          Your contacts list is empty.
        </Typography>
      )}
    </Box>
  );
};

export default TelegramContacts;
