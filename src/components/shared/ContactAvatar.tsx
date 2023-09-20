import React, { useCallback, useEffect, useState } from "react";
import { convertToDataURL } from "../../utils/convertToDataURL";

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
  const [avatar, setAvatar] = useState<string | null>(null);

  const getAvatar = useCallback(async () => {
    if (contact.photo?.strippedThumb?.data) {
      const avatar = await convertToDataURL(contact.photo?.strippedThumb?.data);
      setAvatar(avatar || null);
    }
  }, [contact.photo?.strippedThumb?.data]);

  useEffect(() => {
    getAvatar();
  }, [getAvatar]);

  return (
    <div
      style={{
        width: "42px",
        height: "42px",
        minWidth: "42px",
        borderRadius: "21px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        background: "#f5f5f5",
        overflow: "hideen",
      }}
    >
      {getAvatarText(contact)}
    </div>
  );
};

export default ContactAvatar;
