import React, { useState } from "react";
import BottomNavigation from "../shared/BottomNavigation";
import AppHeader from "../shared/AppHeader";
import useAppContext from "../../hooks/useAppContext";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { Box, Tab, Tabs } from "@mui/material";
import { FixedSizeList as List } from "react-window";
import { TelegramUserActivity } from "../../types/Telegram";
import Activity from "../shared/Activity";

const ActivityPage = () => {
  const { height } = useWindowDimensions();
  const {
    state: { activity, user },
  } = useAppContext();
  const [tab, setTab] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newTab: number) => {
    setTab(newTab);
  };
  return (
    <>
      <AppHeader />
      <div
        style={{ width: "100%", padding: "16px 0 0", boxSizing: "border-box" }}
      >
        <div
          style={{
            position: "sticky",
            top: "61px",
            width: "100%",
            background: "#fff",
            padding: "0 16px",
            boxSizing: "border-box",
            zIndex: 1,
          }}
        >
          <Tabs
            variant="fullWidth"
            value={tab}
            onChange={handleChange}
            aria-label="basic tabs example"
            sx={{
              width: "100%",
              boxSizing: "border-box",
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px",
              "& .MuiTabs-scroller": {
                background: "var(--grindery-cool-grey-cool-grey-00, #F1F2F4)",
              },
              "& .MuiTabs-indicator": {
                display: "none",
              },
              "& .MuiTab-root": {
                color: "var(--grindery-solids-black, #0B0D17)",
                fontSize: "14px",
                fontFamily: "Geologica",
                minWidth: "70px",
                "&.Mui-selected": {
                  color: "var(--grindery-solids-action-alert, #8C30F5)",
                },
              },
            }}
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
                height={height - 125 - 53}
                itemCount={
                  activity.filter(
                    (activity: TelegramUserActivity) =>
                      tab === 0 ||
                      (tab === 1 &&
                        user?.userTelegramID !== activity.senderTgId) ||
                      (tab === 2 &&
                        user?.userTelegramID === activity.senderTgId)
                  ).length
                }
                itemSize={68}
                width="100%"
                itemData={activity.filter(
                  (activity: TelegramUserActivity) =>
                    tab === 0 ||
                    (tab === 1 &&
                      user?.userTelegramID !== activity.senderTgId) ||
                    (tab === 2 && user?.userTelegramID === activity.senderTgId)
                )}
              >
                {ItemRenderer}
              </List>
            </Box>
          ) : (
            <p
              style={{ margin: "50px 20px", textAlign: "center", opacity: 0.6 }}
            >
              You have no transactions.
            </p>
          )}
        </div>
      </div>

      <BottomNavigation />
    </>
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
      <Activity activity={data[index]} key={data[index]._id} />
    </div>
  );
};

export default ActivityPage;
