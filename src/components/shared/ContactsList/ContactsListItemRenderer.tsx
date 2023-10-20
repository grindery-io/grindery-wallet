import React from "react";
import { Box } from "@mui/material";
import ContactListItem from "../ContactListItem/ContactListItem";
import { ContactsListProps } from "./ContactsList";

interface Props extends ContactsListProps {
  data: any;
  index: number;
  style: any;
}

const ContactsListItemRenderer = ({
  selected,
  onSelect,
  onContactClick,
  data,
  index,
  style,
}: Props) => {
  return (
    <Box sx={style} key={data[index].id}>
      <ContactListItem
        contact={data[index]}
        selected={(selected || []).includes(data[index].id)}
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

export default ContactsListItemRenderer;
