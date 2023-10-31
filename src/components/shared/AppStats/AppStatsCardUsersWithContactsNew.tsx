import React from "react";
import AppStatsCard from "./AppStatsCard";
import { selectAppStore, useAppSelector } from "../../../store";
import { Tooltip, Typography } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { blue } from "@mui/material/colors";

const AppStatsCardUsersWithContactsNew = () => {
  const {
    debug: { stats },
  } = useAppSelector(selectAppStore);

  const hour = stats?.users.withContacts.new.hour || 0;
  const day = stats?.users.withContacts.new.day || 0;

  return (
    <AppStatsCard
      color="white"
      background={blue[500]}
      title="New contact access"
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
        <Tooltip title="Number of wallet users who granted access to telegram contacts in the last hour or 24 hours">
          <InfoOutlinedIcon sx={{ fontSize: "20px", display: "block" }} />
        </Tooltip>
      }
    />
  );
};

export default AppStatsCardUsersWithContactsNew;
