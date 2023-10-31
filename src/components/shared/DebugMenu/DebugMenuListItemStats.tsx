import React from "react";
import { useNavigate } from "react-router";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import DebugMenuListItem from "./DebugMenuListItem";

const DebugMenuListItemStats = () => {
  const navigate = useNavigate();

  return (
    <DebugMenuListItem
      label="App stats"
      value={
        <KeyboardArrowRightIcon
          sx={{ color: "var(--tg-theme-hint-color, #999999)" }}
        />
      }
      onClick={() => {
        navigate("/debug/stats");
      }}
    />
  );
};

export default DebugMenuListItemStats;
