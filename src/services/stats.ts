import axios from "axios";
import { BOT_API_URL } from "../constants";

export const getStatsRequest = async () => {
  return await axios.get(`${BOT_API_URL}/v2/stats`, {
    headers: {
      Authorization: `Bearer ${window.Telegram?.WebApp?.initData || ""}`,
    },
  });
};

export const getAppStatsRequest = async () => {
  return await axios.get(`${BOT_API_URL}/v2/stats/app`);
};
