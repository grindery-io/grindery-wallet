import React, { useEffect, useState } from "react";
import { Box, SxProps } from "@mui/material";
import useAppContext from "../../../../hooks/useAppContext";
import { useContact } from "../Contact";
import { STORAGE_KEYS } from "../../../../constants";
import { InitialsAvatar } from "@twa-dev/mark42";

type ContactAvatarProps = {
  size?: number;
  sx?: SxProps | React.CSSProperties;
};

const ContactAvatar = ({ size = 36, sx }: ContactAvatarProps) => {
  const { id, firstName, lastName } = useContact();
  const { photos } = useAppContext();
  const photo = photos?.[id];

  const [avatar, setAvatar] = useState(
    Boolean(
      localStorage.getItem(STORAGE_KEYS.CONTACT_PHOTO.replace("{{id}}", id))
    ) &&
      localStorage.getItem(STORAGE_KEYS.CONTACT_PHOTO.replace("{{id}}", id)) !==
        "null"
      ? localStorage.getItem(
          STORAGE_KEYS.CONTACT_PHOTO.replace("{{id}}", id)
        ) || ""
      : photo || ""
  );

  useEffect(() => {
    if (photo) {
      setAvatar(photo);
    }
  }, [photo]);

  return (
    <Box
      sx={{
        borderRadius: "50%",
        overflow: "hidden",
        width: `${size}px`,
        minWidth: `${size}px`,
        height: `${size}px`,

        ...(sx || {}),
      }}
    >
      {avatar && avatar !== "null" ? (
        <img
          src={avatar}
          alt=""
          style={{
            width: "100%",
            height: "100%",
            display: "block",
            minWidth: "100%",
          }}
        />
      ) : (
        <>
          <InitialsAvatar
            entityId={id === "null" ? 101 : parseInt(id || "101")}
            entityName={`${firstName} ${lastName}`}
            theme="apple"
            size={size}
            style={{ fontWeight: "400" }}
          />
        </>
      )}
    </Box>
  );
};

export default ContactAvatar;
