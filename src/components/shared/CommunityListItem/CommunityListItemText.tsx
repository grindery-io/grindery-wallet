import React from "react";
import { ListItemText } from "@mui/material";
import { CommunityListItemProps } from "./CommunityListItem";

const CommunityListItemText = (props: CommunityListItemProps) => {
  const { community } = props;
  const {
    fields: { Title, Description },
  } = community;
  return (
    <ListItemText
      sx={CommunityListItemTextStyles}
      primary={Title}
      secondary={Description}
      primaryTypographyProps={{
        variant: "xs",
        sx: CommunityListItemTextPrimaryTypographyStyles,
      }}
      secondaryTypographyProps={{
        variant: "xs",
        color: "hint",
        sx: CommunityListItemTextSecondaryTypographyStyles,
      }}
    />
  );
};

const CommunityListItemTextStyles = {
  margin: 0,
};

const CommunityListItemTextPrimaryTypographyStyles = {
  lineHeight: 1.25,
  display: "-webkit-box",
  maxWidth: "100%",
  WebkitLineClamp: 1,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
};

const CommunityListItemTextSecondaryTypographyStyles = {
  lineHeight: 1.25,
  display: "-webkit-box",
  maxWidth: "100%",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
};

export default CommunityListItemText;
