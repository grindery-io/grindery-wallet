import React from "react";
import { useNavigate } from "react-router";
import TableRow from "../../TableRow";
import { selectAppStore, useAppSelector } from "../../../../store";
import { RewardProps } from "../Reward";
import Contact from "components/shared/Contact/Contact";
import ContactName from "components/shared/Contact/ContactName/ContactName";
import ContactAvatar from "components/shared/Contact/ContactAvatar/ContactAvatar";

const RewardDetailsInvited = (props: RewardProps) => {
  const { reward } = props;
  const navigate = useNavigate();

  const {
    user,
    activity: { items: activities },
    contacts: { items: contactsItems },
  } = useAppSelector(selectAppStore);

  const activity = activities.find(
    (a) => a.transactionHash === reward?.parentTransactionHash
  );

  const id =
    (activity?.recipientTgId !== user?.userTelegramID
      ? activity?.recipientTgId
      : activity?.senderTgId) || "";

  const contact = contactsItems?.find((contact) => contact.id === id);

  return reward.parentTransactionHash && contact ? (
    <Contact contact={contact}>
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
              <ContactName />
            </span>
          ) : (
            "Unknown user"
          )
        }
        onValueClick={() => {
          navigate(`/contacts/${contact.id}`);
        }}
        icon={<ContactAvatar size={20} />}
      />
    </Contact>
  ) : null;
};

export default RewardDetailsInvited;
