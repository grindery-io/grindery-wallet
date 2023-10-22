import React from "react";
import { ListItem, ListItemSecondaryAction, ListItemText } from "@mui/material";

type DebugMenuListItemProps = {
  label: string;
  value: React.ReactNode;
  onValueClick?: () => void;
};

const DebugMenuListItem = ({
  label,
  value,
  onValueClick,
}: DebugMenuListItemProps) => {
  return (
    <ListItem>
      <ListItemText sx={DebugMenuListItemPrimaryTextStyles} primary={label} />
      <ListItemSecondaryAction onClick={onValueClick}>
        {typeof value === "string" ? (
          <ListItemText
            secondary={value}
            sx={
              typeof onValueClick !== "undefined"
                ? DebugMenuListItemSecondaryLinkStyles
                : DebugMenuListItemSecondaryTextStyles
            }
          />
        ) : (
          value
        )}
      </ListItemSecondaryAction>
    </ListItem>
  );
};

const DebugMenuListItemPrimaryTextStyles = {
  color: "var(--tg-theme-text-color, #000000)",
};

const DebugMenuListItemSecondaryTextStyles = {
  color: "var(--tg-theme-hint-color, #999999)",
  "& .MuiListItemText-secondary": {
    color: "var(--tg-theme-hint-color, #999999)",
  },
};

const DebugMenuListItemSecondaryLinkStyles = {
  color: "var(--tg-theme-link-color, #2481cc)",
  "& .MuiListItemText-secondary": {
    color: "var(--tg-theme-link-color, #2481cc)",
  },
};

export default DebugMenuListItem;
