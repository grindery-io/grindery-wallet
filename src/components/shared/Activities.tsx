import React from "react";
import { Typography } from "@mui/material";
import useAppContext from "../../hooks/useAppContext";
import { TelegramUserActivity } from "../../context/AppContext";
import Activity from "./Activity";

const Activities = () => {
  const {
    state: { activity },
  } = useAppContext();
  console.log("activity", activity);

  return (
    <div style={{ width: "100%" }}>
      <Typography
        variant="h6"
        sx={{
          margin: "0 0 8px",
          padding: "0 0 2px",
          textAlign: "left",
          position: "sticky",
          top: "0px",
          background: "#fff",
          zIndex: 1,
        }}
      >
        Activity
      </Typography>
      <div style={{ textAlign: "left" }}>
        {activity && activity.length > 0 ? (
          <ul style={{ padding: 0, margin: 0 }}>
            {activity.map((activity: TelegramUserActivity) => (
              <Activity key={activity._id} activity={activity} />
            ))}
          </ul>
        ) : (
          <p style={{ margin: "20px" }}>You have no transactions.</p>
        )}
      </div>
    </div>
  );
};

export default Activities;
