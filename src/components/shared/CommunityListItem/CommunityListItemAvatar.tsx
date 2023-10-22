import React from "react";
import { Box, ListItemAvatar } from "@mui/material";
import { CommunityListItemProps } from "./CommunityListItem";

const CommunityListItemAvatar = ({ community }: CommunityListItemProps) => {
  const {
    fields: { Title, Image },
  } = community;
  return (
    <ListItemAvatar sx={CommunityListItemAvatarStyles}>
      {Image ? (
        <Box sx={CommunityListItemAvatarImageWrapperStyles}>
          <img src={Image} alt="" style={CommunityListItemAvatarImageStyles} />
        </Box>
      ) : (
        <Box sx={CommunityListItemAvatarCharStyles}>{Title?.charAt(0)}</Box>
      )}
    </ListItemAvatar>
  );
};

const CommunityListItemAvatarStyles = { minWidth: "50px", marginRight: "10px" };

const CommunityListItemAvatarImageWrapperStyles = {
  width: "50px",
  minWidth: "50px",
  height: "50px",
  borderRadius: "50%",
  overflow: "hidden",
};

const CommunityListItemAvatarImageStyles = {
  width: "50px",
  height: "50px",
  display: "block",
};

const CommunityListItemAvatarCharStyles = {
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

export default CommunityListItemAvatar;
