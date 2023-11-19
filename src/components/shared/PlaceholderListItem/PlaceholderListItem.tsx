import React from "react";
import { ListItem } from "@mui/material";
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
      <PlaceholderListItemAvatar />
      <PlaceholderListItemText />
    </ListItem>
  );
};

const ListItemStyles = {
  margin: "10px 16px 0",
  width: "calc(100% - 32px)",
  borderRadius: "5px",
  overflow: "hidden",
  padding: "10px",
};

export default PlaceholderListItem;
