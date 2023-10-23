import axios from "axios";
import { BOT_API_URL } from "../constants";

export const getUserRequest = async (
  userId: string,
  controller?: AbortController
) => {
  return await axios.get(`${BOT_API_URL}/v2/user?id=${userId}`, {
    signal: controller?.signal,
    headers: {
      Authorization: `Bearer ${window.Telegram?.WebApp?.initData || ""}`,
    },
  });
};
