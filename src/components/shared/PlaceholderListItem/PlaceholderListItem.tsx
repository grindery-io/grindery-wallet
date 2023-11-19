import React from "react";
import { ListItem, ListItemButton } from "@mui/material";
import PlaceholderListItemAvatar from "./PlaceholderListItemAvatar";
import PlaceholderListItemText from "./PlaceholderListItemText";

const PlaceholderListItem = () => {
  return (
    <ListItem
      sx={{
        ...ListItemStyles,
        backgroundColor: "transparent",
        border: "1px solid var(--gr-theme-divider-color)",
      }}
    >
      <ListItemButton
        sx={{
          ...ListItemButtonStyles,
        }}
      >
        <PlaceholderListItemAvatar />
        <PlaceholderListItemText />
      </ListItemButton>
    </ListItem>
  );
};

const ListItemStyles = {
  margin: "10px 16px 0",
  width: "calc(100% - 32px)",
  padding: 0,
  borderRadius: "5px",
  overflow: "hidden",
};

const ListItemButtonStyles = {
  padding: "10px",
};

export default PlaceholderListItem;
