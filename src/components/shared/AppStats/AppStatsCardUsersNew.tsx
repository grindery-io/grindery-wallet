import React from "react";
import AppStatsCard from "./AppStatsCard";
import { selectAppStore, useAppSelector } from "../../../store";
import { Tooltip, Typography } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { green } from "@mui/material/colors";

const AppStatsCardUsersNew = () => {
  const {
    debug: { stats },
  } = useAppSelector(selectAppStore);

  const hour = stats?.users.new.hour || 0;
  const day = stats?.users.new.day || 0;

  return (
    <AppStatsCard
      color="white"
      background={green[500]}
      title="New users"
      content={
        <Typography
          variant="title"
          sx={{ fontWeight: "normal", marginTop: "8px" }}
        >
          {hour}
          <span
            style={{
              fontSize: "10px",
              display: "inline-block",
              marginRight: "8px",
            }}
          >
            / hr
          </span>{" "}
          {day}
          <span style={{ fontSize: "10px" }}>/ 24hrs</span>
        </Typography>
      }
      action={
        <Tooltip title="Number of new wallet users for the last hour and 24 hours">
          <InfoOutlinedIcon sx={{ fontSize: "20px", display: "block" }} />
        </Tooltip>
      }
    />
  );
};

export default AppStatsCardUsersNew;
