import React from "react";
import ContactViewDetails from "./ContactViewDetails";
import ContactViewActivities from "./ContactViewActivities";
import ContactViewSendTokensButton from "./ContactViewSendTokensButton";
import { selectAppStore, useAppSelector } from "../../../store";
import Contact from "../Contact/Contact";
import Loading from "../Loading";

const ContactView = ({ id }: { id: string }) => {
  const {
    contacts: { items },
  } = useAppSelector(selectAppStore);

  const contact = items?.find((item) => item.id === id);

  return contact ? (
    <Contact contact={contact}>
      <ContactViewDetails />
      <ContactViewActivities />
      <ContactViewSendTokensButton />
    </Contact>
  ) : (
    <Loading />
  );
};

export default ContactView;
