import React from "react";
import { Box, Stack } from "@mui/material";
import AppStatsCardUsersTotal from "./AppStatsCardUsersTotal";
import AppStatsCardUsersWithContactsTotal from "./AppStatsCardUsersWithContactsTotal";
import AppStatsCardUsersNew from "./AppStatsCardUsersNew";
import AppStatsCardUsersWithContactsNew from "./AppStatsCardUsersWithContactsNew";

const cards = [
  <AppStatsCardUsersTotal />,
  <AppStatsCardUsersNew />,
  <AppStatsCardUsersWithContactsTotal />,
  <AppStatsCardUsersWithContactsNew />,
];

const AppStats = () => {
  return (
    <Stack
      sx={AppStatsStyles}
      direction="row"
      alignItems="stretch"
      justifyContent="flex-start"
      spacing="16px"
      flexWrap="wrap"
      useFlexGap
    >
      {cards.map((card, i) => (
        <Box sx={{ width: "calc(50% - 8px)" }} key={i}>
          {card}
        </Box>
      ))}
    </Stack>
  );
};

const AppStatsStyles = {
  width: "100%",
  padding: "16px",
};

export default AppStats;
