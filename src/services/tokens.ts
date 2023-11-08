import axios from "axios";
import { BOT_API_URL } from "../constants";

export const searchTokensRequest = async (
  search?: string,
  controller?: AbortController
) => {
  const searchBy = search && search.startsWith("0x") ? "address" : "symbol";
  return await axios.get(
    `https://api.enso.finance/api/v1/baseTokens?chainId=137&${searchBy}=${
      search || ""
    }`,
    {
      signal: controller?.signal,
    }
  );
};

export const getTokensPriceRequest = async (
  symbol?: string,
  controller?: AbortController
) => {
  return await axios.get(`${BOT_API_URL}/v2/tokens/price?symbol=${symbol}`, {
    signal: controller?.signal,
    headers: {
      Authorization: `Bearer ${window.Telegram?.WebApp?.initData || ""}`,
    },
  });
};
