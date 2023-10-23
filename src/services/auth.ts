import axios from "axios";
import { BOT_API_URL } from "../constants";

export const initAuthRequest = async (phone: string, password: string) => {
  return await axios.post(
    `${BOT_API_URL}/v2/auth/init`,
    {
      phone,
      password,
    },
    {
      headers: {
        Authorization: `Bearer ${window.Telegram?.WebApp?.initData || ""}`,
      },
    }
  );
};

export const callbackAuthRequest = async (
  operationId: string,
  code: string
) => {
  return await axios.post(
    `${BOT_API_URL}/v2/auth/callback`,
    {
      operationId,
      code,
    },
    {
      headers: {
        Authorization: `Bearer ${window.Telegram?.WebApp?.initData || ""}`,
      },
    }
  );
};
