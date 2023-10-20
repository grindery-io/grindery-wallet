import React from "react";
import { Box, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router";
import { TelegramUserActivity } from "../../../types/Telegram";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import { BOT_API_URL } from "../../../constants";
import {
  appStoreActions,
  selectAppStore,
  useAppDispatch,
  useAppSelector,
} from "../../../store";
import ActivityListItem from "../ActivityListItem/ActivityListItem";

const ActivitiesListItems = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, activity } = useAppSelector(selectAppStore);

  const { items, total, find: activityFind } = activity;

  const data = items;

  return (
    <Box sx={ActivitiesListItemsStyles}>
      <InfiniteScroll
        dataLength={data.length}
        next={async () => {
          try {
            const find = [...(activityFind || [])];
            const filters: any = {
              $or: [],
            };
            if (filters["$or"].includes("received")) {
              filters["$or"].push({
                recipientTgId: user?.userTelegramID,
              });
            }
            if (filters["$or"].includes("sent")) {
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
                  Authorization: "Bearer " + window.Telegram?.WebApp?.initData,
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
      >
        {data.map((act: TelegramUserActivity) => (
          <ActivityListItem
            activity={act}
            key={act._id}
            onClick={() => {
              navigate(`/activities/${act._id}`);
            }}
          />
        ))}
      </InfiniteScroll>
    </Box>
  );
};

const ActivitiesListItemsStyles = {
  textAlign: "left",
  "& > div": {
    padding: "0 0 10px",
    boxSizing: "border-box",
  },
};

export default ActivitiesListItems;
