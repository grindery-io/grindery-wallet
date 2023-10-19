import React from "react";
import BottomNavigation from "../shared/BottomNavigation";
import { useNavigate } from "react-router";
import ContactsList from "../shared/ContactsList/ContactsList";
import ContactsPagePlaceholder from "../shared/ContactsPagePlaceholder";

const ContactsPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <ContactsList
        onContactClick={(contact) => {
          navigate(`/contacts/${contact.id}`);
        }}
        placeholder={<ContactsPagePlaceholder />}
      />

      <BottomNavigation />
    </>
  );
};

export default ContactsPage;
