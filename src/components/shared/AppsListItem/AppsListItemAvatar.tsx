import React from "react";
import { Box, ListItemAvatar } from "@mui/material";
import { AppsListItemProps } from "./AppsListItem";

const AppsListItemAvatar = ({ app }: AppsListItemProps) => {
  const {
    fields: { Title, Image },
  } = app;
  return (
    <ListItemAvatar sx={AppsListItemAvatarStyles}>
      {Image ? (
        <Box sx={AppsListItemAvatarImageWrapperStyles}>
          <img src={Image} alt="" style={AppsListItemAvatarImageStyles} />
        </Box>
      ) : (
        <Box sx={AppsListItemAvatarCharStyles}>{Title?.charAt(0)}</Box>
      )}
    </ListItemAvatar>
  );
};

const AppsListItemAvatarStyles = { minWidth: "50px", marginRight: "10px" };

const AppsListItemAvatarImageWrapperStyles = {
  width: "50px",
  minWidth: "50px",
  height: "50px",
  borderRadius: "50%",
  overflow: "hidden",
};

const AppsListItemAvatarImageStyles = {
  width: "50px",
  height: "50px",
  display: "block",
};

const AppsListItemAvatarCharStyles = {
  width: "50px",
  minWidth: "50px",
  height: "50px",
  borderRadius: "50%",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  background: "var(--tg-theme-secondary-bg-color, #efeff3)",
  color: "var(--tg-theme-text-color, #000000)",
  fontSize: "22px",
};

export default AppsListItemAvatar;
