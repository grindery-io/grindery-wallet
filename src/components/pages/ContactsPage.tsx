import React from "react";
import BottomNavigation from "../shared/BottomNavigation";
import AppHeader from "../shared/AppHeader";
import { useNavigate } from "react-router";
import Contacts from "../shared/Contacts";

const ContactsPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <AppHeader />

      <Contacts
        onContactClick={(contact) => {
          navigate(`/send?recipient=${contact.id}`);
        }}
      />

      <BottomNavigation />
    </>
  );
};

export default ContactsPage;
