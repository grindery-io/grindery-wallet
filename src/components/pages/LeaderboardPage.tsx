import React, { useEffect, useState } from "react";
import Container from "../shared/Container";
import axios from "axios";
import { BOT_API_URL } from "../../constants";
import {
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import moment from "moment";

type Props = {};

const LeaderboardPage = (props: Props) => {
  const [leaderboard, setLeaderboard] = useState<any[]>(
    JSON.parse(localStorage.getItem("gr_wallet_leaderboard") || "[]")
  );

  const getLeaderboard = async () => {
    try {
      const res = await axios.get(`${BOT_API_URL}/v1/telegram/leaderboard`);
      setLeaderboard(res.data || []);
      localStorage.setItem("gr_wallet_leaderboard", JSON.stringify(res.data));
      localStorage.setItem(
        "gr_wallet_leaderboard_last_updated",
        Date.now().toString()
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getLeaderboard();
  }, []);

  return (
    <Container>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Place</TableCell>
            <TableCell>Name</TableCell>
            <TableCell># of tx</TableCell>
            <TableCell># of rewards</TableCell>
            <TableCell># of referrals</TableCell>
            <TableCell>Balance</TableCell>
            <TableCell>User joined</TableCell>
            <TableCell>First transaction</TableCell>
            <TableCell>Last transaction</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {leaderboard.map((leader, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                {leader.user?.userName ||
                  leader.user?.userHandle ||
                  leader.user?.userTelegramId ||
                  ""}
              </TableCell>
              <TableCell>{leader.txCount || 0}</TableCell>
              <TableCell>{leader.rewardsCount || 0}</TableCell>
              <TableCell>{leader.referralsCount || 0}</TableCell>
              <TableCell>{leader.balance || 0}</TableCell>
              <TableCell>
                {moment(leader.user.dateAdded).fromNow() || ""}
              </TableCell>
              <TableCell>
                {moment(leader.firstTx.dateAdded).fromNow() || ""}
              </TableCell>
              <TableCell>
                {moment(leader.lastTx.dateAdded).fromNow() || ""}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default LeaderboardPage;
