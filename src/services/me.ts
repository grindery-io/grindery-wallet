import axios from "axios";
import { WALLET_API_URL } from "../constants";

export const getMeRequest = async () => {
  return await axios.get(`${WALLET_API_URL}/v2/me`, {
    headers: {
      Authorization: `Bearer ${window.Telegram?.WebApp?.initData || ""}`,
    },
  });
};
