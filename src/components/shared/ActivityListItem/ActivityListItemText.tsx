import React from "react";
import moment from "moment";
import { ListItemText } from "@mui/material";
import { selectAppStore, useAppSelector } from "../../../store";
import { ActivityListItemProps } from "./ActivityListItem";
import Contact from "../Contact/Contact";
import ContactName from "../Contact/ContactName/ContactName";
import { shortenAddress } from "../../../utils/shortenAddress";

/**
 * Single activity list item text
 */
const ActivityListItemText = (props: ActivityListItemProps) => {
  const { activity } = props;
  const {
    user,
    contacts: { items },
  } = useAppSelector(selectAppStore);

  const isSender = user?.userTelegramID === activity.senderTgId;

  const secondaryUserId = isSender
    ? activity.recipientTgId
    : activity.senderTgId;

  const contact = items?.find((item) => item.id === secondaryUserId);

  const address =
    (activity?.recipientTgId !== user?.userTelegramID
      ? activity?.recipientWallet
      : activity?.senderWallet) || "";

  return contact ? (
    <Contact contact={contact}>
      <ListItemText
        sx={ListItemTextStyles}
        primary={
          <span>
            {`${
              user?.userTelegramID === activity.senderTgId
                ? "Sent to"
                : "Received from"
            } `}
            <ContactName />
          </span>
        }
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
    </Contact>
  ) : (
    <ListItemText
      sx={ListItemTextStyles}
      primary={`${
        user?.userTelegramID === activity.senderTgId
          ? "Sent to"
          : "Received from"
      } ${shortenAddress(address)}`}
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
