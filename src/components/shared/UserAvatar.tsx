import React from "react";
import { Box, SxProps } from "@mui/material";
import { AppUser } from "../../hooks/useAppUser";

type Props = {
  user: AppUser;
  size?: number;
  sx?: SxProps | React.CSSProperties;
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
      {user.avatar ? (
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
            backgroundColor: "var(--tg-theme-hint-color, #999999)",
            color: "var(--tg-theme-bg-color, #ffffff)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: size ? `${size / 2}px` : "18px",
            fontWeight: "bold",
          }}
        >
          {user.avatarText}
        </Box>
      )}
    </Box>
  );
};

export default UserAvatar;
