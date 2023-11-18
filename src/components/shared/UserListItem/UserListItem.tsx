import React from "react";
import { useLongPress } from "use-long-press";
import { ListItem, ListItemButton } from "@mui/material";
import { selectAppStore, useAppSelector } from "../../../store";
import UserListItemAvatar from "./UserListItemAvatar";
import UserListItemText from "./UserListItemText";
import UserListItemEnd from "./UserListItemEnd";
import User, { UserIdType, UserType } from "../User/User";

export type UserProps = {
  user: UserType;
  selected?: boolean;
  onUserClick: (id: UserIdType) => void;
  onUserPress?: (id: UserIdType) => void;
};

const UserListItem = (props: UserProps) => {
  const { user, selected, onUserClick, onUserPress } = props;
  const { debug } = useAppSelector(selectAppStore);
  const bind = useLongPress(() => {
    if (typeof onUserPress !== "undefined") {
      onUserPress(user.userTelegramID);
    }
  });

  return (
    <User user={user}>
      <ListItem
        sx={{
          ...ListItemStyles,
          backgroundColor: selected
            ? "var(--tg-theme-accent-pale)"
            : "transparent",
          border: selected
            ? "1px solid var(--tg-theme-button-color, #2481cc)"
            : "1px solid var(--gr-theme-divider-color)",
        }}
      >
        <ListItemButton
          sx={{
            ...ListItemButtonStyles,
            WebkitUserSelect:
              typeof onUserPress !== "undefined" ? "none" : "auto",
            userSelect: typeof onUserPress !== "undefined" ? "none" : "auto",
          }}
          onClick={() => {
            onUserClick(user.userTelegramID);
          }}
          {...(typeof onUserPress !== "undefined" &&
          debug.features?.BATCH_SENDING
            ? bind()
            : {})}
        >
          <UserListItemAvatar />
          <UserListItemText />
          <UserListItemEnd {...props} />
        </ListItemButton>
      </ListItem>
    </User>
  );
};

const ListItemStyles = {
  margin: "10px 16px 0",
  width: "calc(100% - 32px)",
  padding: 0,
  borderRadius: "5px",
  overflow: "hidden",
};

const ListItemButtonStyles = {
  padding: "10px",
};

export default UserListItem;
