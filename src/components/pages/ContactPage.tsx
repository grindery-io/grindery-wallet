import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import useBackButton from "../../hooks/useBackButton";
import Contact from "../shared/Contact/Contact";

const ContactPage = () => {
  const navigate = useNavigate();
  useBackButton();
  const { id } = useParams();

  useEffect(() => {
    if (!id) {
      navigate("/");
    }
  }, [id, navigate]);

  return <Contact id={id || ""} />;
};

export default ContactPage;
