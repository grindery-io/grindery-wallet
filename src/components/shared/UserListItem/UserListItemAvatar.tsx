import React from "react";
import { ListItemAvatar } from "@mui/material";
import UserAvatar from "../User/UserAvatar/UserAvatar";

const UserListItemAvatar = () => {
  return (
    <ListItemAvatar
      sx={{ minWidth: "36px", marginRight: "16px", position: "relative" }}
    >
      <UserAvatar size={36} badgeSize={16} />
    </ListItemAvatar>
  );
};

export default UserListItemAvatar;
