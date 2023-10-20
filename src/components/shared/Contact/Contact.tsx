import React from "react";
import useAppUser from "../../../hooks/useAppUser";
import ContactDetails from "./ContactDetails";
import ContactActivities from "./ContactActivities";
import ContactSendTokensButton from "./ContactSendTokensButton";

const Contact = ({ id }: { id: string }) => {
  const { user: contact } = useAppUser(id || "");

  return contact ? (
    <>
      <ContactDetails contact={contact} />
      <ContactActivities contact={contact} />
      <ContactSendTokensButton contact={contact} />
    </>
  ) : null;
};

export default Contact;
