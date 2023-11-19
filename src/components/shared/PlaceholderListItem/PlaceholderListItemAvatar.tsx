import React from "react";
import { ListItemAvatar, Skeleton } from "@mui/material";

const PlaceholderListItemAvatar = () => {
  return (
    <ListItemAvatar
      sx={{ minWidth: "36px", marginRight: "16px", position: "relative" }}
    >
      <Skeleton variant="circular" width={36} height={36} />
    </ListItemAvatar>
  );
};

export default PlaceholderListItemAvatar;
