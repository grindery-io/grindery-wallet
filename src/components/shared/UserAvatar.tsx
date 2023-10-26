import React from "react";
import { Box, SxProps } from "@mui/material";
import { AppUser } from "../../hooks/useAppUser";
import { AVATAR_COLORS } from "../../constants";
import { random } from "lodash";

type Props = {
  user: AppUser;
  size?: number;
  sx?: SxProps | React.CSSProperties;
};

const getUserTypeId = (user: AppUser): number => {
  for (let i = 0; i < 7; i++) {
    if (user.id.startsWith(i.toString())) {
      return i;
    }
  }
  for (let i = 0; i < 7; i++) {
    if (user.id.endsWith(i.toString())) {
      return i;
    }
  }
  for (let i = 0; i < 7; i++) {
    if (user.id.includes(i.toString())) {
      return i;
    }
  }
  return random(0, 6);
};

const UserAvatar = ({ user, size, sx }: Props) => {
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
        <Box
          sx={{
            width: "100%",
            height: "100%",
            backgroundColor: AVATAR_COLORS[getUserTypeId(user)],
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: size ? `${size / 2}px` : "18px",
            fontWeight: "400",
            textTransform: "uppercase",
          }}
        >
          {user.avatarText}
        </Box>
      )}
    </Box>
  );
};

export default UserAvatar;
