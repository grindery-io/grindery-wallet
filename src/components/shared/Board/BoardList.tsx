import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Box, CircularProgress } from "@mui/material";
import {
  appStoreActions,
  selectAppStore,
  useAppDispatch,
  useAppSelector,
} from "../../../store";
import BoardListItem from "./BoardListItem";
import BoardListItemSticky from "./BoardListItemSticky";

const BoardList = () => {
  const {
    user,
    leaderboard: { page, total, docs },
  } = useAppSelector(selectAppStore);
  const dispatch = useAppDispatch();

  const leaderboard = docs;

  const id = user?.userTelegramID || "";

  return (
    <Box
      sx={{
        marginTop: "5px",
        "& .infinite-scroll-component": {
          overflow: "visible !important",
        },
      }}
    >
      <InfiniteScroll
        dataLength={leaderboard.length}
        next={async () => {
          dispatch(appStoreActions.setLeaderboard({ page: page + 1 }));
        }}
        hasMore={leaderboard.length < total}
        loader={
          <Box
            sx={{
              textAlign: "center",
              margin: "20px",
            }}
          >
            <CircularProgress
              size="20px"
              sx={{ color: "var(--tg-theme-button-color, #2481cc)" }}
            />
          </Box>
        }
      >
        {leaderboard.map((leader, index) => (
          <BoardListItem
            leader={leader}
            id={id}
            key={leader.user?.userTelegramID || index}
          />
        ))}
      </InfiniteScroll>
      {!leaderboard.map((leader) => leader.user.userTelegramID).includes(id) &&
        leaderboard.length > 0 && <BoardListItemSticky />}
    </Box>
  );
};

export default BoardList;
