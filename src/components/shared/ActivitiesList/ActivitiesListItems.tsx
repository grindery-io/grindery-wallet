import React from "react";
import { Box, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router";
import { TelegramUserActivity } from "../../../types/Telegram";
import InfiniteScroll from "react-infinite-scroll-component";
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
  const { activity } = useAppSelector(selectAppStore);

  const { items, total } = activity;

  const data = items;

  return (
    <Box sx={ActivitiesListItemsStyles}>
      <InfiniteScroll
        dataLength={data.length}
        next={() => {
          dispatch(
            appStoreActions.setActivity({
              skip: data.length,
            })
          );
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
