import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { BOT_API_URL } from "../../constants";
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import moment from "moment";

const LeaderboardPage = () => {
  const [me, setMe] = useState<any>(null);
  const id = me?.userTelegramID || "";
  const [page, setPage] = useState(1);
  const [stop, setStop] = useState(false);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getLeaderboard = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${BOT_API_URL}/v1/telegram/leaderboard?limit=30&page=${page}`
      );
      const items = res.data || [];
      setLeaderboard((_leaderboard) =>
        page === 1 ? items : [..._leaderboard, ...items]
      );

      if (items.length < 1) {
        setStop(true);
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  }, [page]);

  const getMe = async () => {
    try {
      const res = await axios.get(`${BOT_API_URL}/v1/telegram/me`, {
        headers: {
          Authorization: `Bearer ${window.Telegram?.WebApp?.initData || ""}`,
        },
      });

      setMe(res?.data || null);
    } catch (error) {
      setMe(null);
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
        alignItems="center"
        justifyContent="flex-start"
        gap="8px"
        sx={{ margin: "0 16px" }}
      >
        <Typography variant="xl">Leaderboard</Typography>
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
              "& p": {
                padding: "4px 8px",
                width: "calc((100% - 210px) / 7)",
                fontWeight: "bold",
              },
              "& > p:nth-child(1)": {
                width: "60px",
              },
              "& > p:nth-child(2)": {
                width: "150px",
              },
            }}
          >
            <Typography align="center">Place</Typography>
            <Typography align="left">Name</Typography>
            <Typography align="right">TXs</Typography>
            <Typography align="right">Rewards</Typography>
            <Typography align="right">Referrals</Typography>
            <Typography align="right">Balance</Typography>
            <Typography align="right">Joined</Typography>
            <Typography align="right">First tx</Typography>
            <Typography align="right">Last tx</Typography>
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
                top: id && id === leader.user?.userTelegramID ? "32px" : 0,
                bottom: 0,
                zIndex: id && id === leader.user?.userTelegramID ? 2 : 1,
                borderBottom: "1px solid var(--gr-theme-divider-color)",
                "& p": {
                  padding:
                    id && id === leader.user?.userTelegramID
                      ? "12px 8px"
                      : "8px 8px",
                  width: "calc((100% - 210px) / 7)",
                  fontWeight:
                    id && id === leader.user?.userTelegramID
                      ? "bold"
                      : undefined,
                },
                "& > p:nth-child(1)": {
                  width: "60px",
                },
                "& > p:nth-child(2)": {
                  width: "150px",
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
                {moment(leader.user.dateAdded).fromNow() || ""}
              </Typography>
              <Typography align="right" variant="sm">
                {moment(leader.firstTx.dateAdded).fromNow() || ""}
              </Typography>
              <Typography align="right" variant="sm">
                {moment(leader.lastTx.dateAdded).fromNow() || ""}
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
              setPage(page + 1);
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
