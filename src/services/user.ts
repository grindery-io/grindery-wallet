import axios from "axios";
import { WALLET_API_URL } from "../constants";

export const getUserRequest = async (
  userId: string,
  controller?: AbortController
) => {
  return await axios.get(`${WALLET_API_URL}/v2/user?id=${userId}`, {
    signal: controller?.signal,
    headers: {
      Authorization: `Bearer ${window.Telegram?.WebApp?.initData || ""}`,
    },
  });
};
