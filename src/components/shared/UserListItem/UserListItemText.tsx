import React from "react";
import { ListItemText } from "@mui/material";
import UserName from "../User/UserName/UserName";
import { useUser } from "../User/User";

const UserListItemText = () => {
  const user = useUser();

  return (
    <ListItemText
      sx={ListItemTextStyles}
      primary={<UserName />}
      primaryTypographyProps={{
        variant: "xs",
        sx: PrimaryTypographyStyles,
      }}
      secondaryTypographyProps={{
        variant: "xs",
        color: "hint",
        sx: SecondaryTypographyStyles,
      }}
      secondary={
        user?.userHandle ? (
          <span>
            @<UserName format="username" />
          </span>
        ) : undefined
      }
    ></ListItemText>
  );
};

const ListItemTextStyles = {
  margin: "0 10px 0 0",
};

const PrimaryTypographyStyles = {
  lineHeight: 1.5,
  display: "-webkit-box",
  maxWidth: "100%",
  WebkitLineClamp: 1,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
};

const SecondaryTypographyStyles = {
  lineHeight: 1.5,
  display: "-webkit-box",
  maxWidth: "100%",
  WebkitLineClamp: 1,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
};

export default UserListItemText;
