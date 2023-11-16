import React from "react";
import { Box, Stack, SxProps } from "@mui/material";
import { AppUser } from "../../hooks/useAppUser";
import { getPlatformDesign } from "utils";

type Props = {
  user: AppUser;
  size?: number;
  sx?: SxProps | React.CSSProperties;
};

const UserAvatar = ({ user, size, sx }: Props) => {
  const bgColors = [
    ["#e17076", "#ff885e", "#ff516a"], // red
    ["#faa774", "#ffcd6a", "#ffa85c"], // orange
    ["#a695e7", "#82b1ff", "#665fff"], // purple
    ["#7bc862", "#a0de7e", "#54cb68"], // green
    ["#6ec9cb", "#53edd6", "#28c9b7"], // cyan
    ["#65aadd", "#72d5fd", "#2a9ef1"], // blue
    ["#ee7aae", "#e0a2f3", "#d669ed"], // pink
  ];

  const bgIndex = parseInt(user?.id) % 7;
  const [color, topColor, bottomColor] = bgColors[bgIndex];

  const [firstName = "", lastName = ""] = user?.name || "";

  return (
    <Box
      sx={{
        borderRadius: "50%",
        overflow: "hidden",
        width: size ? `${size}px` : "36px",
        minWidth: size ? `${size}px` : "36px",
        height: size ? `${size}px` : "36px",

        ...(sx || {}),
      }}
    >
      {user.avatar && user.avatar !== "null" ? (
        <img
          src={user.avatar}
          alt=""
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
            fontSize: Math.round((size || 36) / 2.2),
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
  );
};

export default UserAvatar;
