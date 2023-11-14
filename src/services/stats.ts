import axios from "axios";
import { WALLET_API_URL } from "../constants";

export const getStatsRequest = async () => {
  return await axios.get(`${WALLET_API_URL}/v2/stats`, {
    headers: {
      Authorization: `Bearer ${window.Telegram?.WebApp?.initData || ""}`,
    },
  });
};

export const getAppStatsRequest = async () => {
  return await axios.get(`${WALLET_API_URL}/v2/stats/app?history=true`);
};
