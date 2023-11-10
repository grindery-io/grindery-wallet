import axios from "axios";
import { BOT_API_URL } from "../constants";

export const getBalanceRequest = async (
  address: string,
  tokenAddress?: string,
  chainId?: string,
  controller?: AbortController
) => {
  return await axios.post(
    `${BOT_API_URL}/v2/balance/`,
    {
      userAddress: address,
      contractAddress:
        tokenAddress || "0xe36BD65609c08Cd17b53520293523CF4560533d0",
      chainId: chainId || "matic",
    },
    {
      signal: controller?.signal,
    }
  );
};

/**
 *
 * @todo: fix response type
 */
export const getFullBalanceRequest = async (controller?: AbortController) => {
  return await axios.get<{
    success: true;
  }>(`${BOT_API_URL}/v2/balance/`, {
    signal: controller?.signal,
    headers: {
      Authorization: "Bearer " + window.Telegram?.WebApp?.initData,
    },
  });
};
