import React from "react";
import {
  ListItem,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemText,
} from "@mui/material";

type DebugMenuListItemProps = {
  label: string;
  value: React.ReactNode;
  onClick?: () => void;
  onValueClick?: () => void;
};

const DebugMenuListItem = ({
  label,
  value,
  onClick,
  onValueClick,
}: DebugMenuListItemProps) => {
  const renderContent = () => (
    <>
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
    </>
  );

  return (
    <ListItem>
      {onClick ? (
        <ListItemButton
          sx={{
            position: "initial",
            padding: 0,
            "&:hover": {
              background: "transparent",
            },
          }}
          onClick={onClick}
          disableRipple
          disableTouchRipple
        >
          {renderContent()}
        </ListItemButton>
      ) : (
        renderContent()
      )}
    </ListItem>
  );
};

const DebugMenuListItemPrimaryTextStyles = {
  maxWidth: "60%",
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
