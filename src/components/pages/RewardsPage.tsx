import React, { useCallback, useState } from "react";
import BottomNavigation from "../shared/BottomNavigation";
import { Box, CircularProgress, Typography } from "@mui/material";
import Reward from "../shared/Reward";
import { useNavigate } from "react-router";
import PendingReward from "../shared/PendingReward";
import ReferralReward from "../shared/ReferralReward";
import SearchBox, { Filter } from "../shared/SearchBox";
import ReferralBanner from "../shared/ReferralBanner";
import { debounce } from "lodash";
import {
  appStoreActions,
  selectAppStore,
  useAppDispatch,
  useAppSelector,
} from "../../store";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import { BOT_API_URL } from "../../constants";
import { TelegramUserActivity, TelegramUserReward } from "../../types/Telegram";

const RewardsPage = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const {
    rewards: { total, find, docs: data, filter, loading },
  } = useAppSelector(selectAppStore);

  const [search, setSearch] = useState("");

  const options: Filter[] = [
    {
      key: "pending",
      label: "Eligible for reward",
      value: filter === "pending",
      type: "radio",
      isActive: filter === "pending",
      onChange: (value) => {
        dispatch(
          appStoreActions.setRewards({
            filter: value.toString() || "",
          })
        );
      },
    },
    {
      key: "received",
      label: "Rewards received",
      value: filter === "received",
      type: "radio",
      isActive: filter === "received",
      onChange: (value) => {
        dispatch(
          appStoreActions.setRewards({
            filter: value.toString() || "",
          })
        );
      },
    },
  ];

  const request = debounce((value) => {
    dispatch(
      appStoreActions.setRewards({
        find: value
          ? [
              {
                $or: [
                  {
                    transactionHash: { $regex: value, $options: "i" },
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
    <>
      <Box sx={{ width: "100%", padding: "0", boxSizing: "border-box" }}>
        <SearchBox
          placeholder="Rewards"
          value={search}
          onChange={(e: string) => {
            debouncedSearchChange(e);
            setSearch(e);
          }}
          filters={options}
          hideCount
          //hideBadge
        />
        <Box sx={{ textAlign: "left" }}>
          <>
            {data.length > 0 ? (
              <Box
                sx={{
                  "& > div": {
                    padding: "0 0 20px",
                    boxSizing: "border-box",
                    "& > div": {
                      padding: "0 0 10px",
                      boxSizing: "border-box",
                    },
                  },
                }}
              >
                <Box>
                  <InfiniteScroll
                    dataLength={data.length}
                    next={async () => {
                      try {
                        const res = await axios.get(
                          `${BOT_API_URL}/v2/rewards/${
                            filter || "received"
                          }?limit=15&skip=${data.length}&find=${JSON.stringify(
                            find || []
                          )}`,
                          {
                            headers: {
                              Authorization:
                                "Bearer " + window.Telegram?.WebApp?.initData,
                            },
                          }
                        );
                        dispatch(
                          appStoreActions.addRewardDocs(res.data?.docs || [])
                        );
                        dispatch(
                          appStoreActions.setRewards({
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
                  >
                    {data.map(
                      (row: TelegramUserActivity | TelegramUserReward) => (
                        <React.Fragment key={row._id}>
                          {(row as TelegramUserReward).responsePath ? (
                            <>
                              {!(row as TelegramUserReward)
                                .parentTransactionHash ? (
                                <Reward
                                  reward={row as TelegramUserReward}
                                  key={row._id}
                                  onClick={() => {
                                    navigate(`/rewards/${row._id}`);
                                  }}
                                />
                              ) : (
                                <ReferralReward
                                  reward={row as TelegramUserReward}
                                  key={row._id}
                                  onClick={() => {
                                    navigate(`/rewards/${row._id}`);
                                  }}
                                />
                              )}
                            </>
                          ) : (
                            <PendingReward
                              activity={row as TelegramUserActivity}
                              key={row._id}
                              onClick={() => {
                                navigate(`/activities/${row._id}`);
                              }}
                            />
                          )}
                        </React.Fragment>
                      )
                    )}
                  </InfiniteScroll>
                </Box>
              </Box>
            ) : (
              <>
                {loading ? (
                  <Box
                    sx={{
                      textAlign: "center",
                      margin: "50px 20px",
                    }}
                  >
                    <CircularProgress
                      sx={{ color: "var(--tg-theme-button-color, #2481cc)" }}
                    />
                  </Box>
                ) : (
                  <Typography
                    sx={{
                      margin: "50px 20px",
                      textAlign: "center",
                    }}
                    color="hint"
                  >
                    You have no rewards.
                  </Typography>
                )}
              </>
            )}
          </>
        </Box>
      </Box>
      <ReferralBanner />
      <BottomNavigation />
    </>
  );
};

export default RewardsPage;
