import React from "react";
import { ListItemText } from "@mui/material";
import { AppsListItemProps } from "./AppsListItem";

const AppsListItemText = (props: AppsListItemProps) => {
  const { app } = props;
  const {
    fields: { Title, Description },
  } = app;
  return (
    <ListItemText
      sx={AppsListItemTextStyles}
      primary={Title}
      secondary={Description}
      primaryTypographyProps={{
        variant: "xs",
        sx: AppsListItemTextPrimaryTypographyStyles,
      }}
      secondaryTypographyProps={{
        variant: "xs",
        color: "hint",
        sx: AppsListItemTextSecondaryTypographyStyles,
      }}
    />
  );
};

const AppsListItemTextStyles = {
  margin: 0,
};

const AppsListItemTextPrimaryTypographyStyles = {
  lineHeight: 1.25,
  display: "-webkit-box",
  maxWidth: "100%",
  WebkitLineClamp: 1,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
};

const AppsListItemTextSecondaryTypographyStyles = {
  lineHeight: 1.25,
  display: "-webkit-box",
  maxWidth: "100%",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
};

export default AppsListItemText;
