import React from "react";
import AppStatsCard from "./AppStatsCard";
import { selectAppStore, useAppSelector } from "../../../store";
import { Tooltip, Typography } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { blue } from "@mui/material/colors";

const AppStatsCardUsersWithContactsTotal = () => {
  const {
    debug: { stats },
  } = useAppSelector(selectAppStore);

  const total = stats?.users.withContacts.total || 0;

  return (
    <AppStatsCard
      color="white"
      background={blue[500]}
      title="Contacts access granted"
      content={
        <Typography
          variant="title"
          sx={{ fontWeight: "normal", marginTop: "8px" }}
        >
          {total}
        </Typography>
      }
      action={
        <Tooltip title="Total number of the users who had granted access to their telegram contacts">
          <InfoOutlinedIcon sx={{ fontSize: "20px", display: "block" }} />
        </Tooltip>
      }
    />
  );
};

export default AppStatsCardUsersWithContactsTotal;
