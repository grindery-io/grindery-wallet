import React from "react";
import { TelegramUserActivity } from "../../../types/Telegram";
import { Box } from "@mui/material";
import Loading from "../Loading/Loading";
import ActivityHeader from "./ActivityHeader";
import ActivityDetails from "./ActivityDetails/ActivityDetails";
import ActivityCloseButton from "./ActivityCloseButton";

export type ActivityProps = {
  activity: TelegramUserActivity;
};

const Activity = (props: ActivityProps) => {
  return props.activity ? (
    <Box sx={ActivityStyles}>
      <ActivityHeader />
      <ActivityDetails {...props} />
      <ActivityCloseButton />
    </Box>
  ) : (
    <Loading />
  );
};

const ActivityStyles = {
  padding: "16px",
  width: "100%",
  boxSizing: "border-box",
};

export default Activity;
