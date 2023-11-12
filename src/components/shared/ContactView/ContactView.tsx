import React from "react";
import useAppUser from "../../../hooks/useAppUser";
import ContactViewDetails from "./ContactViewDetails";
import ContactViewActivities from "./ContactViewActivities";
import ContactViewSendTokensButton from "./ContactViewSendTokensButton";

const ContactView = ({ id }: { id: string }) => {
  const { user: contact } = useAppUser(id || "");

  return contact ? (
    <>
      <ContactViewDetails contact={contact} />
      <ContactViewActivities contact={contact} />
      <ContactViewSendTokensButton contact={contact} />
    </>
  ) : null;
};

export default ContactView;
