import React, { useCallback, useState } from "react";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { Box, CircularProgress, Typography } from "@mui/material";
import { FixedSizeList as List } from "react-window";
import Activity from "./Activity/Activity";
import { useNavigate } from "react-router";
import SearchBox, { Filter } from "../shared/SearchBox";
import { TelegramUserActivity } from "../../types/Telegram";
import LeaderboardBanner from "./LeaderboardBanner";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import { BOT_API_URL } from "../../constants";
import { debounce } from "lodash";
import {
  appStoreActions,
  selectAppStore,
  useAppDispatch,
  useAppSelector,
} from "../../store";

const ActivitiesList = ({ virtualized = true }: { virtualized?: boolean }) => {
  const { height } = useWindowDimensions();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, debug, activity } = useAppSelector(selectAppStore);
  const { items, filters, total, find: activityFind } = activity;
  const [search, setSearch] = useState("");

  const data = items;

  const options: Filter[] = [
    {
      key: "sent",
      label: "Sent",
      value: filters.includes("sent"),
      type: "checkbox",
      isActive: filters.includes("sent"),
      onChange: (value) => {
        dispatch(
          appStoreActions.setActivity({
            filters: value
              ? [...filters, "sent"]
              : filters.filter((filter: any) => filter !== "sent"),
          })
        );
      },
      count: items?.filter((act) => act.senderTgId === user?.userTelegramID)
        .length,
    },
    {
      key: "received",
      label: "Received",
      value: filters.includes("received"),
      type: "checkbox",
      isActive: filters.includes("received"),
      onChange: (value) => {
        dispatch(
          appStoreActions.setActivity({
            filters: value
              ? [...filters, "received"]
              : filters.filter((filter: any) => filter !== "received"),
          })
        );
      },
      count: items?.filter(
        (act: any) => act.recipientTgId === user?.userTelegramID
      ).length,
    },
  ];

  const request = debounce((value) => {
    dispatch(
      appStoreActions.setActivity({
        find: value
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
      })
    );
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
          {items && items.length > 0 ? (
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
                        if (filters.includes("received")) {
                          filters["$or"].push({
                            recipientTgId: user?.userTelegramID,
                          });
                        }
                        if (filters.includes("sent")) {
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
                        dispatch(
                          appStoreActions.setActivity({
                            items: [...items, ...(res.data?.docs || [])],
                            total: res.data?.total || 0,
                          })
                        );
                      } catch (error) {
                        console.error("get more activity error: ", error);
                      }
                    }}
                    hasMore={data.length < total}
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
      {debug.enabled && debug.features?.LEADERBOARD && <LeaderboardBanner />}
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
