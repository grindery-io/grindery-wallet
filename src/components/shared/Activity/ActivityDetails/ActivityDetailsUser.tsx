import React from "react";
import { useNavigate } from "react-router";
import TableRow from "../../TableRow";
import useAppUser from "../../../../hooks/useAppUser";
import UserAvatar from "../../UserAvatar";
import { selectAppStore, useAppSelector } from "../../../../store";
import { ActivityProps } from "../Activity";

const ActivityDetailsUser = ({ activity }: ActivityProps) => {
  const navigate = useNavigate();
  const { user } = useAppSelector(selectAppStore);

  const { user: contact } = useAppUser(
    (activity?.recipientTgId !== user?.userTelegramID
      ? activity?.recipientTgId
      : activity?.senderTgId) || ""
  );

  return (
    <TableRow
      label={
        activity?.recipientTgId !== user?.userTelegramID
          ? "Recipient"
          : "Sender"
      }
      value={contact.name}
      onValueClick={() => {
        navigate(`/contacts/${contact.id}`);
      }}
      icon={<UserAvatar user={contact} size={20} />}
    />
  );
};

export default ActivityDetailsUser;
