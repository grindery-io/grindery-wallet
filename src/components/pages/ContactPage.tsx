import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import useBackButton from "../../hooks/useBackButton";
import ContactView from "../shared/ContactView/ContactView";

const ContactPage = () => {
  const navigate = useNavigate();
  useBackButton();
  const { id } = useParams();

  useEffect(() => {
    if (!id) {
      navigate("/");
    }
  }, [id, navigate]);

  return <ContactView id={id || ""} />;
};

export default ContactPage;
