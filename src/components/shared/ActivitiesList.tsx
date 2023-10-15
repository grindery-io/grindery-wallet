import React, { useCallback, useState } from "react";
import useAppContext from "../../hooks/useAppContext";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { Box, CircularProgress, Typography } from "@mui/material";
import { FixedSizeList as List } from "react-window";
import Activity from "../shared/Activity";
import { useNavigate } from "react-router";
import SearchBox, { Filter } from "../shared/SearchBox";
import { TelegramUserActivity } from "../../types/Telegram";
import LeaderboardBanner from "./LeaderboardBanner";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import { BOT_API_URL } from "../../constants";
import { debounce } from "lodash";

const ActivitiesList = ({ virtualized = true }: { virtualized?: boolean }) => {
  const { height } = useWindowDimensions();
  const navigate = useNavigate();

  const {
    state: {
      user,
      activity,
      activityFilters,
      devMode,
      activityTotal,
      activityFind,
    },
    setState,
  } = useAppContext();
  const [search, setSearch] = useState("");

  /*const applyFilters = (act: TelegramUserActivity) => {
    let res = false;
    if (
      activityFilters.includes("sent") &&
      act.senderTgId === user?.userTelegramID
    ) {
      res = true;
    }
    if (
      activityFilters.includes("received") &&
      act.recipientTgId === user?.userTelegramID
    ) {
      res = true;
    }

    return res;
  };*/

  const data = activity;

  const options: Filter[] = [
    {
      key: "sent",
      label: "Sent",
      value: activityFilters.includes("sent"),
      type: "checkbox",
      isActive: activityFilters.includes("sent"),
      onChange: (value) => {
        setState({
          activityFilters: value
            ? [...activityFilters, "sent"]
            : activityFilters.filter((filter) => filter !== "sent"),
        });
      },
      count: activity?.filter((act) => act.senderTgId === user?.userTelegramID)
        .length,
    },
    {
      key: "received",
      label: "Received",
      value: activityFilters.includes("received"),
      type: "checkbox",
      isActive: activityFilters.includes("received"),
      onChange: (value) => {
        setState({
          activityFilters: value
            ? [...activityFilters, "received"]
            : activityFilters.filter((filter) => filter !== "received"),
        });
      },
      count: activity?.filter(
        (act) => act.recipientTgId === user?.userTelegramID
      ).length,
    },
  ];

  const request = debounce((value) => {
    const newState: any = {
      activityFind: value
        ? [
            {
              $or: [
                {
                  recipientWallet: { $regex: value, $options: "i" },
                },
                {
                  senderWallet: { $regex: value, $options: "i" },
                },
                {
                  transactionHash: { $regex: value, $options: "i" },
                },
                {
                  senderName: { $regex: value, $options: "i" },
                },
                {
                  tokenAmount: { $regex: value, $options: "i" },
                },
              ],
            },
          ]
        : [],
    };

    setState(newState);
  }, 1200);

  const debouncedSearchChange = useCallback(
    (value: string) => request(value),
    [request]
  );

  return (
    <Box sx={{ width: "100%", padding: "0", boxSizing: "border-box" }}>
      <SearchBox
        placeholder="Activities"
        value={search}
        onChange={(e: string) => {
          debouncedSearchChange(e);
          setSearch(e);
        }}
        filters={options}
        hideCount
      />
      <Box sx={{ textAlign: "left" }}>
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
              {virtualized ? (
                <List
                  height={height - 120}
                  itemCount={data.length}
                  itemSize={68}
                  width="100%"
                  itemData={data}
                >
                  {TransactionRenderer}
                </List>
              ) : (
                <Box>
                  <InfiniteScroll
                    dataLength={data.length}
                    next={async () => {
                      try {
                        const find = [...(activityFind || [])];
                        const filters: any = {
                          $or: [],
                        };
                        if (activityFilters.includes("received")) {
                          filters["$or"].push({
                            recipientTgId: user?.userTelegramID,
                          });
                        }
                        if (activityFilters.includes("sent")) {
                          filters["$or"].push({
                            senderTgId: user?.userTelegramID,
                          });
                        }
                        if (filters["$or"].length > 0) {
                          find.push(filters);
                        }
                        const res = await axios.get(
                          `${BOT_API_URL}/v2/activity?limit=15&skip=${
                            data.length
                          }&find=${JSON.stringify(find)}`,
                          {
                            headers: {
                              Authorization:
                                "Bearer " + window.Telegram?.WebApp?.initData,
                            },
                          }
                        );
                        setState({
                          activity: [...activity, ...(res.data?.docs || [])],
                          activityTotal: res.data?.total || 0,
                        });
                      } catch (error) {
                        console.error("get more activity error: ", error);
                      }
                    }}
                    hasMore={data.length < activityTotal}
                    loader={
                      <Box sx={{ textAlign: "center", marginTop: "16px" }}>
                        <CircularProgress
                          size="20px"
                          style={{
                            color: "var(--tg-theme-button-color, #2481cc)",
                          }}
                        />
                      </Box>
                    }
                    //scrollableTarget="history-orders-list"
                  >
                    {data.map((act: TelegramUserActivity) => (
                      <Activity
                        activity={act}
                        key={act._id}
                        onClick={() => {
                          navigate(`/activities/${act._id}`);
                        }}
                      />
                    ))}
                  </InfiniteScroll>
                </Box>
              )}
            </Box>
          ) : (
            <Typography
              sx={{
                margin: "50px 20px",
                textAlign: "center",
              }}
              color="hint"
            >
              You have no transactions.
            </Typography>
          )}
        </>
      </Box>
      {devMode.enabled && devMode.features?.LEADERBOARD && (
        <LeaderboardBanner />
      )}
    </Box>
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
  const navigate = useNavigate();
  return (
    <Box sx={style}>
      <Activity
        activity={data[index]}
        key={data[index]._id}
        onClick={() => {
          navigate(`/activities/${data[index]._id}`);
        }}
      />
    </Box>
  );
};

export default ActivitiesList;
