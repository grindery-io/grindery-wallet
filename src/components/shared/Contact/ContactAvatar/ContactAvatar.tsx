import React, { useEffect, useState } from "react";
import { Box, Stack, SxProps } from "@mui/material";
import useAppContext from "../../../../hooks/useAppContext";
import { useContact } from "../Contact";
import { STORAGE_KEYS } from "../../../../constants";
import { getPlatformDesign } from "utils";

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

  const bgColors = [
    ["#e17076", "#ff885e", "#ff516a"], // red
    ["#faa774", "#ffcd6a", "#ffa85c"], // orange
    ["#a695e7", "#82b1ff", "#665fff"], // purple
    ["#7bc862", "#a0de7e", "#54cb68"], // green
    ["#6ec9cb", "#53edd6", "#28c9b7"], // cyan
    ["#65aadd", "#72d5fd", "#2a9ef1"], // blue
    ["#ee7aae", "#e0a2f3", "#d669ed"], // pink
  ];

  const bgIndex = parseInt(id) % 7;
  const [color, topColor, bottomColor] = bgColors[bgIndex];

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
            alt={`${firstName || ""}${lastName ? " " + lastName : ""}`}
            style={{
              width: "100%",
              height: "100%",
              display: "block",
              minWidth: "100%",
            }}
          />
        ) : (
          <Stack
            alignItems="center"
            justifyContent="center"
            sx={{
              width: "100%",
              height: "100%",
              color: "#fff",
              fontSize: Math.round(size / 2.2),
              background:
                getPlatformDesign() === "apple"
                  ? `linear-gradient(180deg, ${topColor} 0%, ${bottomColor} 100%)`
                  : color,
            }}
          >
            {firstName && firstName.charAt(0).toUpperCase()}
            {lastName && lastName.charAt(0).toUpperCase()}
          </Stack>
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
            alt="Grindery logo"
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
