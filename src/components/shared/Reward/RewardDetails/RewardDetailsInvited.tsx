import React from "react";
import { useNavigate } from "react-router";
import TableRow from "../../TableRow";
import useAppUser from "../../../../hooks/useAppUser";
import UserAvatar from "../../UserAvatar";
import { selectAppStore, useAppSelector } from "../../../../store";
import { RewardProps } from "../Reward";

const RewardDetailsInvited = (props: RewardProps) => {
  const { reward } = props;
  const navigate = useNavigate();

  const {
    user,
    activity: { items: activities },
  } = useAppSelector(selectAppStore);

  const activity = activities.find(
    (a) => a.transactionHash === reward?.parentTransactionHash
  );

  const { user: contact } = useAppUser(
    (activity?.recipientTgId !== user?.userTelegramID
      ? activity?.recipientTgId
      : activity?.senderTgId) || ""
  );

  return reward.parentTransactionHash ? (
    <TableRow
      label="Invited"
      value={
        reward.parentTransactionHash && contact ? (
          <span
            style={{
              cursor: "pointer",
              color: "var(--tg-theme-link-color, #2481cc)",
            }}
          >
            {contact.name}
          </span>
        ) : (
          "Unknown user"
        )
      }
      onValueClick={() => {
        navigate(`/contacts/${contact.id}`);
      }}
      icon={<UserAvatar user={contact} size={20} />}
    />
  ) : null;
};

export default RewardDetailsInvited;
