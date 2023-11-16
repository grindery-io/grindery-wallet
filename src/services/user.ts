import axios from "axios";
import { WALLET_API_URL } from "../constants";
import { TelegramUser } from "types";

export type GetUserResponseType = TelegramUser;

export const getUserRequest = async (
  userId: string,
  controller?: AbortController
) => {
  return await axios.get<GetUserResponseType>(
    `${WALLET_API_URL}/v2/user?id=${userId}`,
    {
      signal: controller?.signal,
      headers: {
        Authorization: `Bearer ${window.Telegram?.WebApp?.initData || ""}`,
      },
    }
  );
};
