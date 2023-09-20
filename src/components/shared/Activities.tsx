import React, { useState } from "react";
import { Tab, Tabs } from "@mui/material";
import useAppContext from "../../hooks/useAppContext";
import { TelegramUserActivity } from "../../context/AppContext";
import Activity from "./Activity";

const Activities = () => {
  const {
    state: { activity, user },
  } = useAppContext();
  const [tab, setTab] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newTab: number) => {
    setTab(newTab);
  };

  return (
    <div style={{ width: "100%", paddingTop: "16px" }}>
      <div
        style={{
          position: "sticky",
          top: 0,
          width: "100%",
          background: "#fff",
          paddingBottom: "16px",
          zIndex: 1,
        }}
      >
        <Tabs
          variant="fullWidth"
          value={tab}
          onChange={handleChange}
          aria-label="basic tabs example"
          sx={{ background: "#FDFBFF" }}
        >
          <Tab label="All" sx={{ textTransform: "initial" }} />
          <Tab label="Recieved" sx={{ textTransform: "initial" }} />
          <Tab label="Sent" sx={{ textTransform: "initial" }} />
        </Tabs>
      </div>

      <div style={{ textAlign: "left" }}>
        {activity && activity.length > 0 ? (
          <ul style={{ padding: 0, margin: 0 }}>
            {activity
              .filter(
                (activity: TelegramUserActivity) =>
                  tab === 0 ||
                  (tab === 1 && user?.userTelegramID !== activity.senderTgId) ||
                  (tab === 2 && user?.userTelegramID === activity.senderTgId)
              )
              .map((activity: TelegramUserActivity) => (
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
