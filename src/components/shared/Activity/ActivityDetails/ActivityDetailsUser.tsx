import React from "react";
import { useNavigate } from "react-router";
import TableRow from "../../TableRow";
import { selectAppStore, useAppSelector } from "../../../../store";
import { ActivityProps } from "../Activity";
import ContactName from "../../Contact/ContactName/ContactName";
import Contact from "../../Contact/Contact";
import ContactAvatar from "../../Contact/ContactAvatar/ContactAvatar";
import { Tooltip } from "@mui/material";

const ActivityDetailsUser = ({ activity }: ActivityProps) => {
  const navigate = useNavigate();
  const {
    user,
    contacts: { items },
  } = useAppSelector(selectAppStore);

  const id =
    (activity?.recipientTgId !== user?.userTelegramID
      ? activity?.recipientTgId
      : activity?.senderTgId) || "";

  const contact = items?.find((item) => item.id === id);

  const address =
    (activity?.recipientTgId !== user?.userTelegramID
      ? activity?.recipientWallet
      : activity?.senderWallet) || "";

  return contact ? (
    <Contact contact={contact}>
      <TableRow
        label={
          activity?.recipientTgId !== user?.userTelegramID
            ? "Recipient"
            : "Sender"
        }
        value={<ContactName />}
        onValueClick={() => {
          navigate(`/contacts/${contact.id}`);
        }}
        icon={<ContactAvatar size={20} />}
      />
    </Contact>
  ) : (
    <TableRow
      label={
        activity?.recipientTgId !== user?.userTelegramID
          ? "Recipient"
          : "Sender"
      }
      value={
        <Tooltip title={address}>
          <span>
            {address.substring(0, 6) +
              "..." +
              address.substring(address.length - 4)}
          </span>
        </Tooltip>
      }
    />
  );
};

export default ActivityDetailsUser;
