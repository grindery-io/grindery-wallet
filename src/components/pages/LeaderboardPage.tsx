import React, { useCallback, useEffect, useReducer } from "react";
import axios from "axios";
import { BOT_API_URL } from "../../constants";
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import useBackButton from "../../hooks/useBackButton";
import LeaderRow from "../shared/LeaderRow";
import LeaderboardSortButton from "../shared/LeaderboardSortButton";

type StateProps = {
  me: any;
  page: number;
  stop: boolean;
  loading: boolean;
  sort: string;
  order: string;
};

const LeaderboardPage = () => {
  useBackButton();
  const [state, setState] = useReducer(
    (state: StateProps, newState: Partial<StateProps>) => ({
      ...state,
      ...newState,
    }),
    {
      me: null,
      page: 1,
      stop: false,
      loading: true,
      sort: "txCount",
      order: "desc",
    }
  );
  const [leaderboard, setLeaderboard] = React.useState<any[]>([]);
  const { me, page, stop, loading, sort, order } = state;
  const id = me?.userTelegramID || "";

  const getLeaderboard = useCallback(async () => {
    setState({ loading: true });
    try {
      const res = await axios.get(
        `${BOT_API_URL}/v1/leaderboard?limit=15&page=${page}&sortBy=${sort}&order=${order}`
      );
      const items = res.data || [];
      setLeaderboard((_leaderboard) =>
        page === 1 ? items : [..._leaderboard, ...items]
      );

      if (items.length < 1) {
        setState({ stop: true });
      }
    } catch (error) {
      console.error(error);
    }
    setState({ loading: false });
  }, [page, sort, order]);

  const getMe = async () => {
    try {
      const res = await axios.get(`${BOT_API_URL}/v1/me`, {
        headers: {
          Authorization: `Bearer ${window.Telegram?.WebApp?.initData || ""}`,
        },
      });

      setState({ me: res?.data || null });
    } catch (error) {
      setState({ me: null });
    }
  };

  useEffect(() => {
    getLeaderboard();
  }, [getLeaderboard]);

  useEffect(() => {
    getMe();
  }, []);

  return (
    <Box
      sx={{
        padding: "16px",
        position: "relative",
        backgroundColor: "var(--tg-theme-bg-color, #ffffff)",
      }}
    >
      <Stack
        direction="row"
        alignItems="flex-end"
        justifyContent="flex-start"
        gap="16px"
        sx={{ margin: "0 16px" }}
      >
        <Typography variant="xl">Leaderboard</Typography>
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
          background: "var(--tg-theme-bg-color, #ffffff)",
        }}
      >
        <Stack
          direction="column"
          alignItems="stretch"
          justifyContent="flex-start"
          sx={{ padding: "8px", minWidth: "768px" }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="flex-start"
            sx={{
              position: "sticky",
              top: 0,
              zIndex: 2,
              background: "var(--tg-theme-bg-color, #ffffff)",
              borderBottom: "1px solid var(--gr-theme-divider-color)",
              "& > div": {
                padding: "4px 8px",
                width: "calc((100% - 210px) / 9)",
                maxWidth: "calc((100% - 210px) / 9)",
              },
              "& p": {
                fontWeight: "bold",
                maxWidth: "100%",
                display: "-webkit-box",
                WebkitLineClamp: 1,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              },
              "& > div:nth-child(1)": {
                width: "60px",
                maxWidth: "60px",
              },
              "& > div:nth-child(2)": {
                width: "150px",
                maxWidth: "150px",
              },
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="flex-start"
            >
              <Typography align="center" variant="sm">
                Place
              </Typography>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="flex-start"
            >
              <Typography align="left" variant="sm">
                Name
              </Typography>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="flex-end"
            >
              <Typography align="right" variant="sm">
                TXs
              </Typography>
              <LeaderboardSortButton
                name="txCount"
                loading={loading}
                sort={sort}
                setState={setState}
                order={order}
              />
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="flex-end"
            >
              <Typography align="right" variant="sm">
                Rewards
              </Typography>
              <LeaderboardSortButton
                name="rewardsCount"
                loading={loading}
                sort={sort}
                setState={setState}
                order={order}
              />
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="flex-end"
            >
              <Typography align="right" variant="sm">
                Referrals
              </Typography>
              <LeaderboardSortButton
                name="referralsCount"
                loading={loading}
                sort={sort}
                setState={setState}
                order={order}
              />
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="flex-end"
            >
              <Typography align="right" variant="sm">
                Balance
              </Typography>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="flex-end"
            >
              <Typography align="right" variant="sm">
                Bot Joined
              </Typography>
              <LeaderboardSortButton
                name="user.dateAdded"
                loading={loading}
                sort={sort}
                setState={setState}
                order={order}
              />
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="flex-end"
            >
              <Typography align="right" variant="sm">
                TG connected
              </Typography>
              <LeaderboardSortButton
                name="user.telegramSessionSavedDate"
                loading={loading}
                sort={sort}
                setState={setState}
                order={order}
              />
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="flex-end"
            >
              <Typography align="right" variant="sm">
                WebWallet activated
              </Typography>
              <LeaderboardSortButton
                name="user.webAppOpenedFirstDate"
                loading={loading}
                sort={sort}
                setState={setState}
                order={order}
              />
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="flex-end"
            >
              <Typography align="right" variant="sm">
                First tx
              </Typography>
              <LeaderboardSortButton
                name="firstTx.dateAdded"
                loading={loading}
                sort={sort}
                setState={setState}
                order={order}
              />
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="flex-end"
            >
              <Typography align="right" variant="sm">
                Last tx
              </Typography>
              <LeaderboardSortButton
                name="lastTx.dateAdded"
                loading={loading}
                sort={sort}
                setState={setState}
                order={order}
              />
            </Stack>
          </Stack>
          {leaderboard.map((leader, index) => (
            <LeaderRow leader={leader} id={id} index={index} key={index} />
          ))}
        </Stack>
      </Box>
      {!stop && !loading && (
        <Box sx={{ textAlign: "center", margin: "20px" }}>
          <Button
            disabled={loading}
            onClick={() => {
              setState({ page: page + 1 });
            }}
          >
            Show more
          </Button>
        </Box>
      )}
      {loading && (
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
      )}
    </Box>
  );
};

export default LeaderboardPage;
