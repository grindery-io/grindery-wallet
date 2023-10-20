import React from "react";
import moment from "moment";
import { ListItemText } from "@mui/material";
import useAppUser from "../../../hooks/useAppUser";
import { selectAppStore, useAppSelector } from "../../../store";
import { ActivityListItemProps } from "./ActivityListItem";

/**
 * Single activity list item text
 */
const ActivityListItemText = (props: ActivityListItemProps) => {
  const { activity } = props;
  const { user } = useAppSelector(selectAppStore);

  const secondaryUserId =
    user?.userTelegramID === activity.senderTgId
      ? activity.recipientTgId
      : activity.senderTgId;

  const { user: secondaryUser } = useAppUser(secondaryUserId);

  return (
    <ListItemText
      sx={ListItemTextStyles}
      primary={`${
        user?.userTelegramID === activity.senderTgId
          ? "Sent to"
          : "Received from"
      } ${secondaryUser.name}`}
      primaryTypographyProps={{
        variant: "xs",
        sx: primaryTypographyStyles,
      }}
      secondaryTypographyProps={{
        variant: "xs",
        color: "hint",
        sx: secondaryTypographyStyles,
      }}
      secondary={moment(activity.dateAdded).fromNow()}
    ></ListItemText>
  );
};

const ListItemTextStyles = {
  margin: "0 10px 0 0",
};

const primaryTypographyStyles = {
  lineHeight: 1.5,
  display: "-webkit-box",
  maxWidth: "100%",
  WebkitLineClamp: 1,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
};

const secondaryTypographyStyles = {
  lineHeight: 1.5,
  display: "-webkit-box",
  maxWidth: "100%",
  WebkitLineClamp: 1,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
};

export default ActivityListItemText;
