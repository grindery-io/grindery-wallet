import React from "react";
import { IconButton, Stack } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

type Props = {
  name: string;
  loading: boolean;
  sort: string;
  setState: any;
  order: string;
};

const LeaderboardSortButton = ({
  name,
  loading,
  sort,
  setState,
  order,
}: Props) => {
  return (
    <IconButton
      disabled={loading}
      size="small"
      sx={{
        padding: 0,
        "&:hover": {
          background: "none",
        },
      }}
      onClick={() => {
        if (sort === name) {
          setState({
            order: order === "asc" ? "desc" : "asc",
            page: 1,
          });
        } else {
          setState({ sort: name, page: 1 });
        }
      }}
    >
      <Stack>
        <ArrowDropUpIcon
          sx={{
            marginBottom: "-8px",
            color:
              sort === name && order === "asc"
                ? "var(--tg-theme-link-color, #2481cc)"
                : "var(--tg-theme-text-color, #000000)",
          }}
        />
        <ArrowDropDownIcon
          sx={{
            marginTop: "-8px",
            color:
              sort === name && order === "desc"
                ? "var(--tg-theme-link-color, #2481cc)"
                : "var(--tg-theme-text-color, #000000)",
          }}
        />
      </Stack>
    </IconButton>
  );
};

export default LeaderboardSortButton;
