import React from "react";
import CheckIcon from "../../icons/CheckIcon";
import { Box } from "@mui/material";
import { UserProps } from "./UserListItem";

const UserListItemEnd = (props: UserProps) => {
  const { selected } = props;

  return (
    <Box ml="auto">
      {selected ? (
        <Box sx={BoxSelectedStyles}>
          <CheckIcon />
        </Box>
      ) : null}
    </Box>
  );
};

const BoxSelectedStyles = {
  position: "relative",
  top: "-6px",
  display: "flex",
  alignItems: "center",
  flexDirection: "row",
  justifyContent: "flex-end",
  flexWrap: "nowrap",
  gap: "4px",
  color: "var(--tg-theme-button-color, #2481cc)",
};

export default UserListItemEnd;
