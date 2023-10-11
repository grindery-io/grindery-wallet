import React, { useEffect, useState } from "react";
import axios from "axios";
import { BOT_API_URL } from "../../constants";
import {
  Box,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import moment from "moment";
import RefreshIcon from "../icons/RefreshIcon";

type Props = {};

const LeaderboardPage = (props: Props) => {
  const [leaderboard, setLeaderboard] = useState<any[]>(
    JSON.parse(localStorage.getItem("gr_wallet_leaderboard") || "[]")
  );
  const [loading, setLoading] = useState<boolean>(true);

  const getLeaderboard = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${BOT_API_URL}/v1/telegram/leaderboard?limit=100`
      );
      setLeaderboard(res.data || []);
      localStorage.setItem("gr_wallet_leaderboard", JSON.stringify(res.data));
      localStorage.setItem(
        "gr_wallet_leaderboard_last_updated",
        new Date().toString()
      );
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getLeaderboard();
  }, []);

  return (
    <Box sx={{ padding: "16px" }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-start"
        gap="8px"
        sx={{ margin: "0 16px" }}
      >
        <Typography variant="xl">Leaderboard</Typography>
        <Tooltip title={loading ? "Syncing..." : `Synced`}>
          <Box>
            <IconButton
              disabled={loading}
              onClick={getLeaderboard}
              size="small"
              sx={{
                "& svg": {
                  WebkitAnimation: "spin 0.75s linear infinite",
                  MozAnimation: "spin 0.75s linear infinite",
                  animation: "spin 0.75s linear infinite",
                  animationPlayState: loading ? "running" : "paused",
                },
              }}
            >
              <RefreshIcon />
            </IconButton>
          </Box>
        </Tooltip>
      </Stack>

      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ "& th": { fontWeight: "bold" } }}>
              <TableCell align="center">Place</TableCell>
              <TableCell>Name</TableCell>
              <TableCell align="right">TXs</TableCell>
              <TableCell align="right">Rewards</TableCell>
              <TableCell align="right">Referrals</TableCell>
              <TableCell align="right">Balance</TableCell>
              <TableCell align="right">Joined</TableCell>
              <TableCell align="right">First tx</TableCell>
              <TableCell align="right">Last tx</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leaderboard.map((leader, index) => (
              <TableRow key={index}>
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell>
                  {(
                    leader.user?.userName ||
                    leader.user?.userHandle ||
                    leader.user?.userTelegramId ||
                    ""
                  ).replace("undefined", "")}
                </TableCell>
                <TableCell align="right">
                  {(leader.txCount || 0).toLocaleString()}
                </TableCell>
                <TableCell align="right">
                  {(leader.rewardsCount || 0).toLocaleString()}
                </TableCell>
                <TableCell align="right">
                  {(leader.referralsCount || 0).toLocaleString()}
                </TableCell>
                <TableCell align="right">
                  {parseFloat(
                    (parseFloat(leader.balance) || 0).toFixed(2)
                  ).toLocaleString() || ""}
                </TableCell>
                <TableCell align="right">
                  {moment(leader.user.dateAdded).fromNow() || ""}
                </TableCell>
                <TableCell align="right">
                  {moment(leader.firstTx.dateAdded).fromNow() || ""}
                </TableCell>
                <TableCell align="right">
                  {moment(leader.lastTx.dateAdded).fromNow() || ""}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default LeaderboardPage;
