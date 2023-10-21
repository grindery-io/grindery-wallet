import React from "react";
import { Stack } from "@mui/material";
import ActivityDetailsType from "./ActivityDetailsType";
import ActivityDetailsUser from "./ActivityDetailsUser";
import ActivityDetailsDate from "./ActivityDetailsDate";
import ActivityDetailsStatus from "./ActivityDetailsStatus";
import ActivityDetailsHash from "./ActivityDetailsHash";
import { ActivityProps } from "../Activity";

const ActivityDetails = (props: ActivityProps) => {
  return (
    <Stack
      alignItems="stretch"
      justifyContent="flex-start"
      sx={ActivityDetailsStyles}
    >
      <ActivityDetailsType {...props} />
      <ActivityDetailsUser {...props} />
      <ActivityDetailsDate {...props} />
      <ActivityDetailsStatus {...props} />
      <ActivityDetailsHash {...props} />
    </Stack>
  );
};

const ActivityDetailsStyles = {
  borderRadius: "5px",
  border: "1px solid var(--gr-theme-divider-color)",
  width: "100%",
};

export default ActivityDetails;
