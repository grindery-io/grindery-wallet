import React, { useState } from "react";
import { Box, Tab, Tabs } from "@mui/material";
import useAppContext from "../../hooks/useAppContext";
import Activity from "./Activity";
import { TelegramUserActivity } from "../../types/Telegram";
import { FixedSizeList as List } from "react-window";
import useWindowDimensions from "../../hooks/useWindowDimensions";

const Activities = () => {
  const { height } = useWindowDimensions();
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
          top: "61px",
          width: "100%",
          background: "#fff",
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
          <Tab
            label="All"
            sx={{ textTransform: "initial", fontWeight: "normal" }}
          />
          <Tab
            label="Recieved"
            sx={{ textTransform: "initial", fontWeight: "normal" }}
          />
          <Tab
            label="Sent"
            sx={{ textTransform: "initial", fontWeight: "normal" }}
          />
        </Tabs>
      </div>

      <div style={{ textAlign: "left" }}>
        {activity && activity.length > 0 ? (
          <Box
            sx={{
              "& > div": {
                padding: "0 0 10px",
                boxSizing: "border-box",
                "& > div": {
                  padding: "0 0 10px",
                  boxSizing: "border-box",
                },
              },
            }}
          >
            <List
              height={height - 125 - 56}
              itemCount={
                activity.filter(
                  (activity: TelegramUserActivity) =>
                    tab === 0 ||
                    (tab === 1 &&
                      user?.userTelegramID !== activity.senderTgId) ||
                    (tab === 2 && user?.userTelegramID === activity.senderTgId)
                ).length
              }
              itemSize={68}
              width="100%"
              itemData={activity.filter(
                (activity: TelegramUserActivity) =>
                  tab === 0 ||
                  (tab === 1 && user?.userTelegramID !== activity.senderTgId) ||
                  (tab === 2 && user?.userTelegramID === activity.senderTgId)
              )}
            >
              {ItemRenderer}
            </List>
          </Box>
        ) : (
          <p style={{ margin: "30px", textAlign: "center" }}>
            You have no transactions.
          </p>
        )}
      </div>
    </div>
  );
};

const ItemRenderer = ({
  data,
  index,
  style,
}: {
  data: any;
  index: number;
  style: any;
}) => {
  return (
    <div style={style}>
      <Activity activity={data[index]} />
    </div>
  );
};

export default Activities;
