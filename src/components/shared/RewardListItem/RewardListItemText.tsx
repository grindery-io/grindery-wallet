import React from "react";
import { ListItemText } from "@mui/material";
import { RewardListItemProps } from "./RewardListItem";
import { selectAppStore, useAppSelector } from "../../../store";
import ContactName from "../Contact/ContactName/ContactName";
import Contact from "../Contact/Contact";

const RewardListItemText = (props: RewardListItemProps) => {
  const { reward, type } = props;
  const {
    user,
    activity: { items },
    contacts: { items: contactsItems },
  } = useAppSelector(selectAppStore);
  const activities = items;

  const activity = activities?.find(
    (act) => act.transactionHash === reward.parentTransactionHash
  );

  const secondaryUserId =
    user?.userTelegramID === activity?.senderTgId
      ? activity?.recipientTgId
      : activity?.senderTgId;

  const contact = contactsItems?.find(
    (contact) => contact.id === secondaryUserId
  );

  const renderNoMessagePlaceholder = () => (
    <span style={{ color: "var(--tg-theme-hint-color, #999999)" }}>
      No message
    </span>
  );

  return (
    <ListItemText
      sx={{ margin: 0 }}
      primary={
        type === "referral"
          ? "Referral reward"
          : reward.message || renderNoMessagePlaceholder()
      }
      primaryTypographyProps={{
        variant: "xs",
        sx: RewardListItemTextPrimaryTypographyStyles,
      }}
      secondary={
        type === "referral" && contact ? (
          <Contact contact={contact}>
            <ContactName />
          </Contact>
        ) : undefined
      }
      secondaryTypographyProps={
        type === "referral"
          ? {
              variant: "xs",
              color: "hint",
              sx: RewardListItemTextSecondaryTypographyStyles,
            }
          : undefined
      }
    />
  );
};

const RewardListItemTextPrimaryTypographyStyles = {
  lineHeight: 1.5,
  display: "-webkit-box",
  maxWidth: "100%",
  WebkitLineClamp: 1,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
};

const RewardListItemTextSecondaryTypographyStyles = {
  lineHeight: 1.5,
  display: "-webkit-box",
  maxWidth: "100%",
  WebkitLineClamp: 1,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
};

export default RewardListItemText;
