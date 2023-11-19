import React from "react";
import { ListItemText, Skeleton } from "@mui/material";

const PlaceholderListItemText = () => {
  return (
    <ListItemText
      sx={ListItemTextStyles}
      primary={<Skeleton variant="text" sx={{ width: "50%" }} />}
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
        <Skeleton
          variant="text"
          sx={{
            width: "85%",
          }}
        />
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

export default PlaceholderListItemText;
