import React from "react";
import BottomNavigation from "../shared/BottomNavigation/BottomNavigation";
import { useNavigate } from "react-router";
import ContactsList from "components/shared/ContactsList/ContactsList";
import useWindowDimensions from "hooks/useWindowDimensions";

const ContactsPage = () => {
  const navigate = useNavigate();
  const { height } = useWindowDimensions();

  return (
    <>
      <ContactsList
        onContactClick={(id) => {
          navigate(`/contacts/${id}`);
        }}
        height={height - 120}
      />

      <BottomNavigation />
    </>
  );
};

export default ContactsPage;
