import React from "react";

type Props = {
  contact: any;
};

const getAvatarText = (contact: any) => {
  let avatarText = "";
  if (contact.firstName) {
    avatarText += contact.firstName.charAt(0).toUpperCase();
  }
  if (contact.lastName) {
    avatarText += contact.lastName.charAt(0).toUpperCase();
  }
  if (!avatarText && contact.username) {
    avatarText += contact.username.charAt(0).toUpperCase();
  }
  return avatarText || "U";
};

const ContactAvatar = ({ contact }: Props) => {
  return (
    <div
      style={{
        width: "36px",
        height: "36px",
        minWidth: "36px",
        borderRadius: "18px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        background: "#898989",
        overflow: "hideen",
        color: "#fff",
      }}
    >
      {getAvatarText(contact)}
    </div>
  );
};

export default ContactAvatar;
