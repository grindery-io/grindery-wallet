import React from "react";
import { ListItemText } from "@mui/material";
import { PendingRewardListItemProps } from "./PendingRewardListItem";
import ContactName from "../Contact/ContactName/ContactName";

const PendingRewardListItemText = (props: PendingRewardListItemProps) => {
  const { onTextClick } = props;

  return (
    <ListItemText
      onClick={onTextClick ? onTextClick : undefined}
      sx={{ margin: 0 }}
      primary="Referral reward"
      secondary={<ContactName />}
      primaryTypographyProps={{
        variant: "xs",
        sx: PendingRewardListItemTextPrimaryTypographyStyles,
      }}
      secondaryTypographyProps={{
        variant: "xs",
        color: "hint",
        sx: PendingRewardListItemTextSecondaryTypographyStyles,
      }}
    />
  );
};

const PendingRewardListItemTextPrimaryTypographyStyles = {
  lineHeight: 1.5,
  display: "-webkit-box",
  maxWidth: "100%",
  WebkitLineClamp: 1,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
};

const PendingRewardListItemTextSecondaryTypographyStyles = {
  lineHeight: 1.5,
  display: "-webkit-box",
  maxWidth: "100%",
  WebkitLineClamp: 1,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
};

export default PendingRewardListItemText;
