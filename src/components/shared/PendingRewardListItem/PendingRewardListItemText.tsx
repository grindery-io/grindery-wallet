import React from "react";
import useAppUser from "../../../hooks/useAppUser";
import { ListItemText } from "@mui/material";
import { selectAppStore, useAppSelector } from "../../../store";
import { PendingRewardListItemProps } from "./PendingRewardListItem";

const PendingRewardListItemText = (props: PendingRewardListItemProps) => {
  const { activity, onTextClick } = props;
  const { user } = useAppSelector(selectAppStore);

  const secondaryUserId =
    user?.userTelegramID === activity.senderTgId
      ? activity.recipientTgId
      : activity.senderTgId;

  const { user: secondaryUser } = useAppUser(secondaryUserId);

  return (
    <ListItemText
      onClick={onTextClick ? onTextClick : undefined}
      sx={{ margin: 0 }}
      primary="Referral reward"
      secondary={secondaryUser.name}
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
