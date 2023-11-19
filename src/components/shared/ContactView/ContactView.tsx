import React from "react";
import ContactViewDetails from "./ContactViewDetails";
import ContactViewActivities from "./ContactViewActivities";
import ContactViewSendTokensButton from "./ContactViewSendTokensButton";
import { selectAppStore, useAppSelector } from "../../../store";
import Contact from "../Contact/Contact";
import Loading from "../Loading/Loading";
import User from "../User/User";

const ContactView = ({ id }: { id: string }) => {
  const {
    contacts: { items, social },
  } = useAppSelector(selectAppStore);

  const contact = items?.find((item) => item.id === id);
  const user = social?.find((item) => item.userTelegramID === id);

  return contact ? (
    <Contact contact={contact}>
      <ContactViewDetails />
      <ContactViewActivities />
      <ContactViewSendTokensButton />
    </Contact>
  ) : user ? (
    <User user={user}>
      <ContactViewDetails type="user" />
    </User>
  ) : (
    <Loading />
  );
};

export default ContactView;
