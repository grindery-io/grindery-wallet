import React, { useEffect, useState } from "react";
import { Box, SxProps } from "@mui/material";
import useAppContext from "../../../../hooks/useAppContext";
import { useContact } from "../Contact";
import { STORAGE_KEYS } from "../../../../constants";
import { InitialsAvatar } from "@twa-dev/mark42";

type ContactAvatarProps = {
  size?: number;
  badgeSize?: number;
  sx?: SxProps | React.CSSProperties;
};

const ContactAvatar = ({ size = 36, badgeSize, sx }: ContactAvatarProps) => {
  const { id, firstName, lastName, grinderyUser } = useContact();
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
        width: `${size}px`,
        minWidth: `${size}px`,
        height: `${size}px`,
        position: "relative",
        ...(sx || {}),
      }}
    >
      <Box
        sx={{
          borderRadius: "50%",
          overflow: "hidden",
          width: "100%",
          minWidth: "100%",
          height: "100%",
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
              entityName={`${firstName}${lastName ? ` ${lastName}` : ""}`}
              theme="apple"
              size={size}
              style={{ fontWeight: "400" }}
            />
          </>
        )}
      </Box>
      {badgeSize && grinderyUser && (
        <Box
          sx={{
            position: "absolute",
            bottom: `-5px`,
            right: `-5px`,
            border: "2px solid var(--tg-theme-bg-color, #ffffff)",
            borderRadius: "50%",
          }}
        >
          <img
            src="https://app.grindery.io/logo192.png"
            alt=""
            style={{
              width: `${badgeSize}px`,
              height: `${badgeSize}px`,
              display: "block",
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default ContactAvatar;
