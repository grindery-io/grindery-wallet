import React from "react";
import { FixedSizeList as List } from "react-window";
import { Box } from "@mui/material";
import { selectAppStore, useAppSelector } from "../../../store";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import ContactsListButtons from "./ContactsListButtons";
import { ContactsListProps } from "./ContactsList";
import ContactsListItemRenderer from "./ContactsListItemRenderer";
import { ContactType } from "../Contact/Contact";

interface Props extends ContactsListProps {
  search: string;
}

const ContactsListItems = (props: Props) => {
  const { selected, onSelect, search } = props;
  const { user, contacts } = useAppSelector(selectAppStore);

  const { height } = useWindowDimensions();
  const { items, filters } = contacts || {};

  const applyFilters = (contact: ContactType) => {
    let res = false;
    if (
      (filters || []).includes("invited") &&
      contact.invited &&
      !contact.grinderyUser
    ) {
      res = true;
    }
    if ((filters || []).includes("has-wallet") && contact.grinderyUser) {
      res = true;
    }
    if (
      (filters || []).includes("not-invited") &&
      !contact.grinderyUser &&
      !contact.invited
    ) {
      res = true;
    }

    return res;
  };

  const data = items
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
    .sort((a: ContactType, b: ContactType) =>
      a.invited === b.invited ? 0 : a.invited ? -1 : 1
    )
    .sort((a: ContactType, b: ContactType) =>
      a.grinderyUser === b.grinderyUser ? 0 : a.grinderyUser ? -1 : 1
    )
    .filter((contact) => contact.id !== user?.userTelegramID)
    .filter((contact) =>
      (filters || []).length > 0 ? applyFilters(contact) : true
    );

  return (
    <>
      <Box
        sx={{
          "& > div": {
            padding: `0 0 ${
              typeof onSelect !== "undefined" && selected && selected.length > 0
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
          {(itemProps: { data: any; index: number; style: any }) => (
            <ContactsListItemRenderer {...itemProps} {...props} />
          )}
        </List>
      </Box>
      {typeof onSelect !== "undefined" && selected && selected.length > 0 && (
        <ContactsListButtons {...props} />
      )}
    </>
  );
};

export default ContactsListItems;
