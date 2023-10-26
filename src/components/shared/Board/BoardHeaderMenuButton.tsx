import React from "react";
import { IconButton } from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";
import { selectAppStore, useAppSelector } from "../../../store";

const BoardHeaderMenuButton = ({
  onClick,
}: {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}) => {
  const {
    leaderboard: { loading, docs },
  } = useAppSelector(selectAppStore);

  const leaderboard = docs;

  return (
    <IconButton
      disabled={loading || leaderboard.length < 1}
      sx={{
        padding: "0px",
        color: "var(--tg-theme-button-color, #2481cc)",
        "&:disabled": {
          color: "var(--tg-theme-button-color, #2481cc)",
          opacity: 0.3,
        },
      }}
      onClick={onClick}
    >
      <SortIcon />
    </IconButton>
  );
};

export default BoardHeaderMenuButton;
