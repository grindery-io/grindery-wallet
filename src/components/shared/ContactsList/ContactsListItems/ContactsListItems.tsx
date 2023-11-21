import React from "react";
import { selectAppStore, useAppSelector } from "store";
import { Box } from "@mui/material";
import { VariableSizeList } from "react-window";
import useWindowDimensions from "hooks/useWindowDimensions";
import { ContactsListProps } from "../ContactsList";
import ContactsListItemsRenderer from "../ContactsListItemsRenderer/ContactsListItemsRenderer";
import { ContactsListDataItemVariantType } from "utils";

export interface ContactsListItemsProps extends ContactsListProps {
  data: any[];
}

const ContactsListItems = (props: ContactsListItemsProps) => {
  const { height, width } = useWindowDimensions();
  const { data } = props;

  const {
    debug: { enabled, features },
  } = useAppSelector(selectAppStore);

  const getItemSize = (index: number, data: any) => {
    switch (data[index].variant) {
      case ContactsListDataItemVariantType.BANNER:
        return !enabled || !features?.SOCIAL_CONTACTS ? 470 : 133;
      case ContactsListDataItemVariantType.USER:
        return 68;
      case ContactsListDataItemVariantType.CONTACT:
        return 68;
      case ContactsListDataItemVariantType.HEADER:
        return 21 + 16;
      case ContactsListDataItemVariantType.PLACEHOLDER:
        return 68;
      default:
        return 68;
    }
  };

  return (
    <Box
      sx={{
        "& > div": {
          padding: `0 0 ${
            typeof props.onSelect !== "undefined" &&
            props.selected &&
            props.selected.length > 0
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
      <VariableSizeList
        key={data.length}
        height={props.height || height}
        itemCount={data.length}
        itemSize={(index) => getItemSize(index, data)}
        width={width < 768 ? width : 768}
        itemData={data}
      >
        {(itemProps: { data: any; index: number; style: any }) => (
          <ContactsListItemsRenderer {...itemProps} {...props} />
        )}
      </VariableSizeList>
    </Box>
  );
};

export default ContactsListItems;
