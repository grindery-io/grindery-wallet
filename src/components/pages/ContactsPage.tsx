import React from "react";
import BottomNavigation from "../shared/BottomNavigation/BottomNavigation";
import { useNavigate } from "react-router";
import ContactsList from "../shared/ContactsList/ContactsList";
import ContactsPagePlaceholder from "../shared/ContactsPagePlaceholder";

const ContactsPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <ContactsList
        onContactClick={(id) => {
          navigate(`/contacts/${id}`);
        }}
        placeholder={<ContactsPagePlaceholder />}
      />

      <BottomNavigation />
    </>
  );
};

export default ContactsPage;
