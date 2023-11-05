import React from "react";
import { ListItem, ListItemButton } from "@mui/material";
import AppsListItemAvatar from "./AppsListItemAvatar";
import AppsListItemText from "./AppsListItemText";

export type AppsListItemProps = {
  app: {
    fields: {
      Link?: string;
      Image?: string;
      Status?: string;
      Type?: string;
      Title?: string;
      Description?: string;
    };
  };
};

const AppsListItem = (props: AppsListItemProps) => {
  const { app } = props;
  const {
    fields: { Link },
  } = app;
  return (
    <ListItem sx={AppsListItemStyles}>
      <ListItemButton
        sx={{ padding: "9px 4px 9px 4px" }}
        onClick={
          Link
            ? () => {
                if (
                  typeof window.Telegram?.WebApp?.openTelegramLink !==
                  "undefined"
                ) {
                  window.Telegram?.WebApp?.openTelegramLink(Link);
                } else {
                  window.open(Link, "_blank");
                }
              }
            : undefined
        }
      >
        <AppsListItemAvatar {...props} />
        <AppsListItemText {...props} />
      </ListItemButton>
    </ListItem>
  );
};

const AppsListItemStyles = {
  margin: "0 16px 0px",
  width: "calc(100% - 32px)",
  padding: 0,
  backgroundColor: "transparent",
  borderBottom: "1px solid var(--gr-theme-divider-color)",
};

export default AppsListItem;
