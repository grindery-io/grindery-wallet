import React from "react";
import BottomNavigation from "../shared/BottomNavigation/BottomNavigation";
import { useNavigate } from "react-router";
import ContactsListV2 from "components/shared/ContactsListV2/ContactsListV2";
import useWindowDimensions from "hooks/useWindowDimensions";

const ContactsPage = () => {
  const navigate = useNavigate();
  const { height } = useWindowDimensions();

  return (
    <>
      <ContactsListV2
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
