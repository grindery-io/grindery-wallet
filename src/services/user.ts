import axios from "axios";
import { WALLET_API_URL } from "../constants";
import { UserProps } from "types";

export type GetUserResponseType = UserProps;

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
