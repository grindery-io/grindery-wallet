import React from "react";
import { Box, SxProps } from "@mui/material";
import { UserType, useUser } from "../User";

export type UserNameFormat = "default" | "first" | "last" | "username";

export type UserNameProps = {
  format?: UserNameFormat;
  sx?: SxProps | React.CSSProperties;
};

export const formatUserName = (user: UserType, format: UserNameFormat) => {
  switch (format) {
    case "default":
      return user.userName || user.userHandle;
    case "first":
      return user.userName.split(" ")[0] || user.userHandle;
    case "last":
      return (
        user.userName.split(" ")[1] ||
        user.userName.split(" ")[0] ||
        user.userHandle
      );
    case "username":
      return user.userHandle;
    default:
      return user.userName || user.userHandle;
  }
};

const UserName = ({ format = "default", sx }: UserNameProps) => {
  const user = useUser();

  const name = user ? formatUserName(user, format) : null;

  return name ? (
    <Box sx={sx} component="span">
      {name}
    </Box>
  ) : null;
};

export default UserName;
