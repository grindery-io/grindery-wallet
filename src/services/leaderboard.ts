import axios from "axios";
import { BOT_API_URL } from "../constants";

export const getLeaderboardRequest = async (
  page: number,
  sort: string,
  order: string
) => {
  return await axios.get(
    `${BOT_API_URL}/v2/leaderboard?limit=30&page=${page}&sortBy=${sort}&order=${order}`
  );
};
