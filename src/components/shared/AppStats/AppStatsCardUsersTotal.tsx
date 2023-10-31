import React from "react";
import AppStatsCard from "./AppStatsCard";
import { selectAppStore, useAppSelector } from "../../../store";
import { Tooltip, Typography } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { green } from "@mui/material/colors";

const AppStatsCardUsersTotal = () => {
  const {
    debug: { stats },
  } = useAppSelector(selectAppStore);

  const total = stats?.users.total || 0;

  return (
    <AppStatsCard
      color="white"
      background={green[500]}
      title="Total users"
      content={
        <Typography
          variant="title"
          sx={{ fontWeight: "normal", marginTop: "8px" }}
        >
          {total}
        </Typography>
      }
      action={
        <Tooltip title="Total number of the wallet app users">
          <InfoOutlinedIcon sx={{ fontSize: "20px", display: "block" }} />
        </Tooltip>
      }
    />
  );
};

export default AppStatsCardUsersTotal;
