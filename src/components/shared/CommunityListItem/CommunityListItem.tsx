import React from "react";
import { ListItem, ListItemButton } from "@mui/material";
import CommunityListItemAvatar from "./CommunityListItemAvatar";
import CommunityListItemText from "./CommunityListItemText";

export type CommunityListItemProps = {
  community: {
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

const CommunityListItem = (props: CommunityListItemProps) => {
  const { community } = props;
  const {
    fields: { Link },
  } = community;
  return (
    <ListItem sx={CommunityListItemStyles}>
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
        <CommunityListItemAvatar {...props} />
        <CommunityListItemText {...props} />
      </ListItemButton>
    </ListItem>
  );
};

const CommunityListItemStyles = {
  margin: "0 16px 0px",
  width: "calc(100% - 32px)",
  padding: 0,
  backgroundColor: "transparent",
  borderBottom: "1px solid var(--gr-theme-divider-color)",
};

export default CommunityListItem;
