import axios from "axios";
import { BOT_API_URL } from "../constants";

export const getActivityRequest = async (find: any[], skip?: number) => {
  return await axios.get(
    `${BOT_API_URL}/v2/activity?limit=15&find=${JSON.stringify(find)}&skip=${
      skip || 0
    }`,
    {
      headers: {
        Authorization: "Bearer " + window.Telegram?.WebApp?.initData,
      },
    }
  );
};

export const getSingleActivityRequest = async (
  id: string,
  controller?: AbortController
) => {
  return await axios.get(`${BOT_API_URL}/v2/activity/${id}`, {
    signal: controller?.signal,
    headers: {
      Authorization: "Bearer " + window.Telegram?.WebApp?.initData,
    },
  });
};

export const getUserActivityRequest = async (
  userId: string,
  skip?: number,
  controller?: AbortController
) => {
  return await axios.get(
    `${BOT_API_URL}/v2/activity/user/${userId}?limit=15&skip=${skip || 0}`,
    {
      signal: controller?.signal,
      headers: {
        Authorization: "Bearer " + window.Telegram?.WebApp?.initData,
      },
    }
  );
};
