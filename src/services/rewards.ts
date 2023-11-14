import axios from "axios";
import { WALLET_API_URL } from "../constants";

export const getRewardsRequest = async (
  filter?: string,
  find?: any[],
  skip?: number,
  controller?: AbortController
) => {
  return await axios.get(
    `${WALLET_API_URL}/v2/rewards/${
      filter || "pending"
    }?limit=15&find=${JSON.stringify(find || [])}`,
    {
      signal: controller?.signal,
      headers: {
        Authorization: "Bearer " + window.Telegram?.WebApp?.initData,
      },
    }
  );
};

export const getSingleRewardRequest = async (
  id: string,
  controller?: AbortController
) => {
  return await axios.get(`${WALLET_API_URL}/v2/rewards/${id}`, {
    signal: controller?.signal,
    headers: {
      Authorization: "Bearer " + window.Telegram?.WebApp?.initData,
    },
  });
};
