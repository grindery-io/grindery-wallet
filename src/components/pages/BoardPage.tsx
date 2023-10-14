import React, { useCallback, useEffect, useReducer } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { BOT_API_URL } from "../../constants";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import useBackButton from "../../hooks/useBackButton";
import useAppContext from "../../hooks/useAppContext";
import Leader from "../shared/Leader";
import LeaderFixed from "../shared/LeaderFixed";

type StateProps = {
  page: number;
  total: number;
  loading: boolean;
  sort: string;
  order: string;
};

const BoardPage = () => {
  useBackButton();
  const [state, setState] = useReducer(
    (state: StateProps, newState: Partial<StateProps>) => ({
      ...state,
      ...newState,
    }),
    {
      page: 1,
      total: 0,
      loading: true,
      sort: "txCount",
      order: "desc",
    }
  );
  const {
    state: { user },
  } = useAppContext();
  const [leaderboard, setLeaderboard] = React.useState<any[]>([]);
  const { page, loading, sort, order } = state;
  const id = user?.userTelegramID || "";

  const getLeaderboard = useCallback(async () => {
    setState({ loading: true });
    try {
      const res = await axios.get(
        `${BOT_API_URL}/v1/leaderboard?limit=30&page=${page}&sortBy=${sort}&order=${order}`
      );
      const items = res.data?.items || [];
      setLeaderboard((_leaderboard) =>
        page === 1 ? items : [..._leaderboard, ...items]
      );
      setState({ total: res.data?.total || 0 });
    } catch (error) {
      console.error(error);
    }
    setState({ loading: false });
  }, [page, sort, order]);

  useEffect(() => {
    getLeaderboard();
  }, [getLeaderboard]);

  if (window.origin.includes("localhost")) {
    console.log("state", state);
    console.log("leaderboard", leaderboard);
  }

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        padding: "0",
      }}
    >
      <Stack
        direction="row"
        alignItems="flex-end"
        justifyContent="space-between"
        gap="16px"
        sx={{
          padding: "10px 16px",
          backgroundColor: "var(--tg-theme-bg-color, #ffffff)",
          position: "sticky",
          top: 0,
          borderBottom: "1px solid var(--gr-theme-divider-color)",
          minHeight: "50px",
        }}
      >
        <Typography>Leaderboard</Typography>
        {loading && (
          <Typography
            variant="xs"
            color="hint"
            sx={{ lineHeight: 1.5, marginBottom: "1.5px" }}
          >
            Loading...
          </Typography>
        )}
      </Stack>

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
            setState({ page: page + 1 });
          }}
          hasMore={leaderboard.length < state.total}
          loader={
            <Box
              sx={{
                textAlign: "center",
                margin: "20px",
              }}
            >
              <CircularProgress
                sx={{ color: "var(--tg-theme-button-color, #2481cc)" }}
              />
            </Box>
          }
        >
          {leaderboard.map((leader, index) => (
            <Leader leader={leader} id={id} index={index} key={index} />
          ))}
        </InfiniteScroll>
        {!leaderboard
          .map((leader) => leader.user.userTelegramID)
          .includes(id) &&
          leaderboard.length > 0 && <LeaderFixed />}
      </Box>
      {leaderboard.length < 1 && state.loading && (
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
      )}
    </Box>
  );
};

export default BoardPage;
