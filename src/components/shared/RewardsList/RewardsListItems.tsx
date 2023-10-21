import React from "react";
import { Box, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router";
import PendingReward from "../PendingReward";
import {
  appStoreActions,
  selectAppStore,
  useAppDispatch,
  useAppSelector,
} from "../../../store";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import { BOT_API_URL } from "../../../constants";
import {
  TelegramUserActivity,
  TelegramUserReward,
} from "../../../types/Telegram";
import RewardListItem from "../RewardListItem/RewardListItem";

const RewardsListItems = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const {
    rewards: { total, find, docs: data, filter },
  } = useAppSelector(selectAppStore);

  return (
    <Box sx={RewardsListItemsStyles}>
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
              dispatch(appStoreActions.addRewardDocs(res.data?.docs || []));
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
          {data.map((row: TelegramUserActivity | TelegramUserReward) => (
            <React.Fragment key={row._id}>
              {(row as TelegramUserReward).responsePath ? (
                <>
                  {!(row as TelegramUserReward).parentTransactionHash ? (
                    <RewardListItem
                      reward={row as TelegramUserReward}
                      key={row._id}
                      onClick={() => {
                        navigate(`/rewards/${row._id}`);
                      }}
                    />
                  ) : (
                    <RewardListItem
                      type="referral"
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
                  onAvatarClick={() => {
                    navigate(
                      `/contacts/${(row as TelegramUserActivity).recipientTgId}`
                    );
                  }}
                  onTextClick={() => {
                    navigate(
                      `/activities/${(row as TelegramUserActivity)._id}`
                    );
                  }}
                />
              )}
            </React.Fragment>
          ))}
        </InfiniteScroll>
      </Box>
    </Box>
  );
};

const RewardsListItemsStyles = {
  "& > div": {
    padding: "0 0 20px",
    boxSizing: "border-box",
    "& > div": {
      padding: "0 0 10px",
      boxSizing: "border-box",
    },
  },
};

export default RewardsListItems;
