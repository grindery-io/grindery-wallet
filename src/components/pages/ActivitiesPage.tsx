import React from "react";
import BottomNavigation from "../shared/BottomNavigation";
import AppHeader from "../shared/AppHeader";
import useAppContext from "../../hooks/useAppContext";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { Box, Tab, Tabs } from "@mui/material";
import { FixedSizeList as List } from "react-window";
import { TelegramUserActivity } from "../../types/Telegram";
import Activity from "../shared/Activity";
import Reward from "../shared/Reward";
import { useNavigate, useParams } from "react-router";
import PendingReward from "../shared/PendingReward";

const PRIMARY_TABS = ["transfers", "rewards"];
const TRANSFERS_TABS = ["all", "received", "sent"];
const REWARDS_TABS = ["pending", "received"];

const ActivitiesPage = () => {
  const { height } = useWindowDimensions();
  const navigate = useNavigate();
  const {
    state: { activity, user, activityLoading, rewards, rewardsLoading },
    getTgRewards,
    getTgActivity,
  } = useAppContext();
  const { type, status } = useParams();
  const primaryTab = PRIMARY_TABS.indexOf(type || "") || 0;
  const transactionsTab = TRANSFERS_TABS.indexOf(status || "") || 0;
  const rewardsTab = REWARDS_TABS.indexOf(status || "") || 0;

  const handleChangeTransactionTab = (
    event: React.SyntheticEvent,
    newTab: number
  ) => {
    navigate(`/activities/transfers/${TRANSFERS_TABS[newTab]}`);
  };

  const handleChangeRewardsTabs = (
    event: React.SyntheticEvent,
    newTab: number
  ) => {
    navigate(`/activities/rewards/${REWARDS_TABS[newTab]}`);
  };

  const handlePrimaryTabChange = (
    event: React.SyntheticEvent,
    newTab: number
  ) => {
    navigate(
      `/activities/${newTab === 0 ? "transfers" : "rewards"}/${
        newTab === 0 ? "all" : "pending"
      }`
    );
  };
  return (
    <>
      <AppHeader
        onRefresh={primaryTab === 0 ? getTgActivity : getTgRewards}
        refreshing={primaryTab === 0 ? activityLoading : rewardsLoading}
      />
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
            value={primaryTab}
            onChange={handlePrimaryTabChange}
            aria-label="primary tabs"
            sx={{
              width: "100%",
              boxSizing: "border-box",
              borderTopLeftRadius: "12px",
              borderTopRightRadius: "12px",
              border:
                "1px solid var(--grindery-cool-grey-cool-grey-10, #E3E3E8)",
              "& .MuiTabs-scroller": {
                background: "var(--grindery-cool-grey-cool-grey-00, #fff)",
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
                  color: "var(--grindery-solids-black, #0B0D17)",
                  borderBottom:
                    "2px solid var(--grindery-cool-grey-cool-grey-100, #0B0C0E)",
                  backgroundColor:
                    "var(--grindery-cool-grey-cool-grey-00, #F1F2F4)",
                },
              },
            }}
          >
            <Tab
              label="Transfers"
              sx={{ textTransform: "initial", fontWeight: "normal" }}
            />
            <Tab
              label="Rewards"
              sx={{ textTransform: "initial", fontWeight: "normal" }}
            />
          </Tabs>
          {primaryTab === 0 && (
            <Tabs
              variant="fullWidth"
              value={transactionsTab}
              onChange={handleChangeTransactionTab}
              aria-label="basic tabs example"
              sx={{
                width: "100%",
                boxSizing: "border-box",
                minHeight: "auto",
                borderBottom:
                  "1px solid var(--grindery-cool-grey-cool-grey-10, #E3E3E8)",
                borderLeft:
                  "1px solid var(--grindery-cool-grey-cool-grey-10, #E3E3E8)",
                borderRight:
                  "1px solid var(--grindery-cool-grey-cool-grey-10, #E3E3E8)",

                "& .MuiTabs-scroller": {
                  background: "#fff",
                },
                "& .MuiTabs-indicator": {
                  display: "none",
                },
                "& .MuiTab-root": {
                  padding: "8px 16px",
                  color: "var(--grindery-solids-black, #0B0D17)",
                  fontSize: "12px",
                  fontFamily: "Geologica",
                  minHeight: "auto",
                  minWidth: "70px",
                  "&.Mui-selected": {
                    borderBottom:
                      "2px solid var(--grindery-cool-grey-cool-grey-100, #0B0C0E)",
                    backgroundColor:
                      "var(--grindery-cool-grey-cool-grey-00, #F1F2F4)",
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
          )}

          {primaryTab === 1 && (
            <Tabs
              variant="fullWidth"
              value={rewardsTab}
              onChange={handleChangeRewardsTabs}
              aria-label="basic tabs example"
              sx={{
                width: "100%",
                boxSizing: "border-box",
                minHeight: "auto",
                borderBottom:
                  "1px solid var(--grindery-cool-grey-cool-grey-10, #E3E3E8)",
                borderLeft:
                  "1px solid var(--grindery-cool-grey-cool-grey-10, #E3E3E8)",
                borderRight:
                  "1px solid var(--grindery-cool-grey-cool-grey-10, #E3E3E8)",
                "& .MuiTabs-scroller": {
                  background: "#fff",
                },
                "& .MuiTabs-indicator": {
                  display: "none",
                },
                "& .MuiTab-root": {
                  padding: "8px 16px",
                  color: "var(--grindery-solids-black, #0B0D17)",
                  fontSize: "12px",
                  minHeight: "auto",
                  fontFamily: "Geologica",
                  minWidth: "70px",
                  "&.Mui-selected": {
                    borderBottom:
                      "2px solid var(--grindery-cool-grey-cool-grey-100, #0B0C0E)",
                    backgroundColor:
                      "var(--grindery-cool-grey-cool-grey-00, #F1F2F4)",
                  },
                },
              }}
            >
              <Tab
                label="Pending"
                sx={{ textTransform: "initial", fontWeight: "normal" }}
              />
              <Tab
                label="Received"
                sx={{ textTransform: "initial", fontWeight: "normal" }}
              />
            </Tabs>
          )}
        </div>

        <div style={{ textAlign: "left" }}>
          {primaryTab === 0 && (
            <>
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
                    height={height - 155 - 53}
                    itemCount={
                      activity.filter(
                        (activity: TelegramUserActivity) =>
                          transactionsTab === 0 ||
                          (transactionsTab === 1 &&
                            user?.userTelegramID !== activity.senderTgId) ||
                          (transactionsTab === 2 &&
                            user?.userTelegramID === activity.senderTgId)
                      ).length
                    }
                    itemSize={68}
                    width="100%"
                    itemData={activity.filter(
                      (activity: TelegramUserActivity) =>
                        transactionsTab === 0 ||
                        (transactionsTab === 1 &&
                          user?.userTelegramID !== activity.senderTgId) ||
                        (transactionsTab === 2 &&
                          user?.userTelegramID === activity.senderTgId)
                    )}
                  >
                    {TransactionRenderer}
                  </List>
                </Box>
              ) : (
                <p
                  style={{
                    margin: "50px 20px",
                    textAlign: "center",
                    opacity: 0.6,
                  }}
                >
                  You have no transactions.
                </p>
              )}
            </>
          )}
          {primaryTab === 1 && (
            <>
              {(rewardsTab === 0 && rewards.pending.length > 0) ||
              (rewardsTab === 1 && rewards.received.length > 0) ? (
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
                    height={height - 155 - 53}
                    itemCount={
                      rewardsTab === 0
                        ? rewards.pending.length
                        : rewards.received.length
                    }
                    itemSize={68}
                    width="100%"
                    itemData={
                      rewardsTab === 0 ? rewards.pending : rewards.received
                    }
                  >
                    {rewardsTab === 0
                      ? PendingRewardRenderer
                      : ReceivedRewardRenderer}
                  </List>
                </Box>
              ) : (
                <p
                  style={{
                    margin: "50px 20px",
                    textAlign: "center",
                    opacity: 0.6,
                  }}
                >
                  You have no rewards.
                </p>
              )}
            </>
          )}
        </div>
      </div>

      <BottomNavigation />
    </>
  );
};

const TransactionRenderer = ({
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

const ReceivedRewardRenderer = ({
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
      <Reward reward={data[index]} key={data[index]._id} />
    </div>
  );
};

const PendingRewardRenderer = ({
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
      <PendingReward activity={data[index]} key={data[index]._id} />
    </div>
  );
};

export default ActivitiesPage;
