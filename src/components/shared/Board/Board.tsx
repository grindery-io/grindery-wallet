import React, { useCallback, useEffect } from "react";
import { STORAGE_KEYS } from "../../../constants";
import { Box } from "@mui/material";
import {
  appStoreActions,
  selectAppStore,
  useAppDispatch,
  useAppSelector,
} from "../../../store";
import { getLeaderboardRequest } from "../../../services/leaderboard";
import BoardHeader from "./BoardHeader";
import Loading from "../Loading";
import BoardList from "./BoardList";

const Board = () => {
  const {
    leaderboard: { page, loading, sort, order, docs },
  } = useAppSelector(selectAppStore);
  const dispatch = useAppDispatch();

  const leaderboard = docs;

  const [hideLoader, setHideLoader] = React.useState(false);

  const getLeaderboard = useCallback(async () => {
    dispatch(appStoreActions.setLeaderboard({ loading: true }));
    try {
      const res = await getLeaderboardRequest(page, sort, order);
      const items = res.data?.items || [];
      if (page === 1) {
        dispatch(appStoreActions.setLeaderboardDocs(items));
      } else {
        dispatch(appStoreActions.addLeaderboardDocs(items));
      }
      dispatch(
        appStoreActions.setLeaderboard({
          total: res.data?.total || 0,
          savedDate: new Date().toString(),
        })
      );

      if (page === 1 && sort === "txCount" && order === "desc") {
        localStorage.setItem(STORAGE_KEYS.LEADERBOARD, JSON.stringify(items));
        localStorage.setItem(
          STORAGE_KEYS.LEADERBOARD_SAVED,
          new Date().toString()
        );
      }
    } catch (error) {
      console.error(error);
    }
    dispatch(appStoreActions.setLeaderboard({ loading: false }));
  }, [page, sort, order, dispatch]);

  useEffect(() => {
    getLeaderboard();
  }, [getLeaderboard]);

  return (
    <Box sx={BoardStyles}>
      <BoardHeader setHideLoader={setHideLoader} />
      <BoardList />
      {leaderboard.length < 1 && loading && !hideLoader && <Loading />}
    </Box>
  );
};

const BoardStyles = {
  position: "relative",
  width: "100%",
  padding: "0",
};

export default Board;
