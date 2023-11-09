import React from "react";
import { Box, SxProps } from "@mui/material";
import { AppUser } from "../../hooks/useAppUser";
import { InitialsAvatar } from "@twa-dev/mark42";

type Props = {
  user: AppUser;
  size?: number;
  sx?: SxProps | React.CSSProperties;
};

const UserAvatar = ({ user, size, sx }: Props) => {
  console.log("user", user);

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
        <InitialsAvatar
          entityId={user?.id === "null" ? 101 : parseInt(user?.id || "101")}
          entityName={user?.name || "Unknown user"}
          theme="apple"
          size={size || 36}
          style={{ fontWeight: "400" }}
        />
      )}
    </Box>
  );
};

export default UserAvatar;
