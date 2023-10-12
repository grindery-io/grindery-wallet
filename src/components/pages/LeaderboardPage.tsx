import React, { useCallback, useEffect, useReducer } from "react";
import axios from "axios";
import { BOT_API_URL } from "../../constants";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import moment from "moment";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

type StateProps = {
  me: any;
  page: number;
  stop: boolean;
  loading: boolean;
  sort: string;
  order: string;
};

const LeaderboardPage = () => {
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
        `${BOT_API_URL}/v1/telegram/leaderboard?limit=30&page=${page}&sortBy=${sort}&order=${order}`
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
      const res = await axios.get(`${BOT_API_URL}/v1/telegram/me`, {
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
    <Box sx={{ padding: "16px", position: "relative" }}>
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
              <IconButton
                disabled={loading}
                size="small"
                sx={{
                  padding: 0,
                  "&:hover": {
                    background: "none",
                  },
                }}
                onClick={() => {
                  if (sort === "txCount") {
                    setState({
                      order: order === "asc" ? "desc" : "asc",
                      page: 1,
                    });
                  } else {
                    setState({ sort: "txCount", page: 1 });
                  }
                }}
              >
                <Stack>
                  <ArrowDropUpIcon
                    sx={{
                      marginBottom: "-8px",
                      color:
                        sort === "txCount" && order === "asc"
                          ? "var(--tg-theme-link-color, #2481cc)"
                          : "var(--tg-theme-text-color, #000000)",
                    }}
                  />
                  <ArrowDropDownIcon
                    sx={{
                      marginTop: "-8px",
                      color:
                        sort === "txCount" && order === "desc"
                          ? "var(--tg-theme-link-color, #2481cc)"
                          : "var(--tg-theme-text-color, #000000)",
                    }}
                  />
                </Stack>
              </IconButton>
              <Typography align="right" variant="sm">
                TXs
              </Typography>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="flex-end"
            >
              <IconButton
                disabled={loading}
                size="small"
                sx={{
                  padding: 0,
                  "&:hover": {
                    background: "none",
                  },
                }}
                onClick={() => {
                  if (sort === "rewardsCount") {
                    setState({
                      order: order === "asc" ? "desc" : "asc",
                      page: 1,
                    });
                  } else {
                    setState({
                      sort: "rewardsCount",
                      page: 1,
                    });
                  }
                }}
              >
                <Stack>
                  <ArrowDropUpIcon
                    sx={{
                      marginBottom: "-8px",
                      color:
                        sort === "rewardsCount" && order === "asc"
                          ? "var(--tg-theme-link-color, #2481cc)"
                          : "var(--tg-theme-text-color, #000000)",
                    }}
                  />
                  <ArrowDropDownIcon
                    sx={{
                      marginTop: "-8px",
                      color:
                        sort === "rewardsCount" && order === "desc"
                          ? "var(--tg-theme-link-color, #2481cc)"
                          : "var(--tg-theme-text-color, #000000)",
                    }}
                  />
                </Stack>
              </IconButton>
              <Typography align="right" variant="sm">
                Rewards
              </Typography>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="flex-end"
            >
              <IconButton
                disabled={loading}
                size="small"
                sx={{
                  padding: 0,
                  "&:hover": {
                    background: "none",
                  },
                }}
                onClick={() => {
                  if (sort === "referralsCount") {
                    setState({
                      order: order === "asc" ? "desc" : "asc",
                      page: 1,
                    });
                  } else {
                    setState({
                      sort: "referralsCount",
                      page: 1,
                    });
                  }
                }}
              >
                <Stack>
                  <ArrowDropUpIcon
                    sx={{
                      marginBottom: "-8px",
                      color:
                        sort === "referralsCount" && order === "asc"
                          ? "var(--tg-theme-link-color, #2481cc)"
                          : "var(--tg-theme-text-color, #000000)",
                    }}
                  />
                  <ArrowDropDownIcon
                    sx={{
                      marginTop: "-8px",
                      color:
                        sort === "referralsCount" && order === "desc"
                          ? "var(--tg-theme-link-color, #2481cc)"
                          : "var(--tg-theme-text-color, #000000)",
                    }}
                  />
                </Stack>
              </IconButton>
              <Typography align="right" variant="sm">
                Referrals
              </Typography>
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
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="flex-end"
            >
              <Typography align="right" variant="sm">
                TG connected
              </Typography>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="flex-end"
            >
              <Typography align="right" variant="sm">
                WebWallet activated
              </Typography>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="flex-end"
            >
              <Typography align="right" variant="sm">
                First tx
              </Typography>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="flex-end"
            >
              <Typography align="right" variant="sm">
                Last tx
              </Typography>
            </Stack>
          </Stack>
          {leaderboard.map((leader, index) => (
            <Stack
              key={index}
              direction="row"
              alignItems="center"
              justifyContent="flex-start"
              sx={{
                background:
                  id && id === leader.user?.userTelegramID
                    ? "var(--tg-theme-secondary-bg-color, #efeff3)"
                    : "var(--tg-theme-bg-color, #ffffff)",
                position:
                  id && id === leader.user?.userTelegramID
                    ? "sticky"
                    : undefined,
                top: id && id === leader.user?.userTelegramID ? "41px" : 0,
                bottom: 0,
                zIndex: id && id === leader.user?.userTelegramID ? 2 : 1,
                borderBottom: "1px solid var(--gr-theme-divider-color)",
                "& p": {
                  padding:
                    id && id === leader.user?.userTelegramID
                      ? "12px 8px"
                      : "8px 8px",
                  width: "calc((100% - 210px) / 9)",
                  fontWeight:
                    id && id === leader.user?.userTelegramID
                      ? "bold"
                      : undefined,
                },
                "& > p:nth-child(1)": {
                  width: "60px",
                  maxWidth: "60px",
                },
                "& > p:nth-child(2)": {
                  width: "150px",
                  maxWidth: "150px",
                },
              }}
            >
              <Typography variant="sm" align="center">
                {index + 1}
              </Typography>
              <Typography variant="sm">
                {(
                  leader.user?.userName ||
                  leader.user?.userHandle ||
                  leader.user?.userTelegramId ||
                  ""
                ).replace("undefined", "")}
              </Typography>
              <Typography align="right" variant="sm">
                {(leader.txCount || 0).toLocaleString()}
              </Typography>
              <Typography align="right" variant="sm">
                {(leader.rewardsCount || 0).toLocaleString()}
              </Typography>
              <Typography align="right" variant="sm">
                {(leader.referralsCount || 0).toLocaleString()}
              </Typography>
              <Typography align="right" variant="sm">
                {parseFloat(
                  (parseFloat(leader.balance) || 0).toFixed(2)
                ).toLocaleString() || ""}
              </Typography>
              <Typography align="right" variant="sm">
                {moment(leader.user?.dateAdded).fromNow() || ""}
              </Typography>
              <Typography align="right" variant="sm">
                {leader.user?.telegramSessionSavedDate
                  ? moment(leader.user?.telegramSessionSavedDate).fromNow() ||
                    ""
                  : leader.user?.telegramSession
                  ? "Yes"
                  : "No"}
              </Typography>
              <Typography align="right" variant="sm">
                {leader.user?.webAppOpenedFirstDate
                  ? moment(leader.user?.webAppOpenedFirstDate).fromNow() || ""
                  : "No"}
              </Typography>
              <Typography align="right" variant="sm">
                {moment(leader.firstTx?.dateAdded).fromNow() || ""}
              </Typography>
              <Typography align="right" variant="sm">
                {moment(leader.lastTx?.dateAdded).fromNow() || ""}
              </Typography>
            </Stack>
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
